param(
    [string]$SourceMarkdown = "ONLINE_EXAMINATION_SYSTEM_BUSINESS_DOCUMENT.md",
    [string]$OutputDocx = "Online_Examination_System_Business_Document.docx"
)

$ErrorActionPreference = "Stop"

function Escape-XmlText {
    param([string]$Text)

    if ($null -eq $Text) { return "" }

    return $Text.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;")
}

function New-RunXml {
    param(
        [string]$Text,
        [switch]$Bold,
        [switch]$Italic
    )

    $properties = ""
    if ($Bold -or $Italic) {
        $propertyParts = @()
        if ($Bold) { $propertyParts += "<w:b/>" }
        if ($Italic) { $propertyParts += "<w:i/>" }
        $properties = "<w:rPr>$($propertyParts -join '')</w:rPr>"
    }

    $safeText = Escape-XmlText $Text
    return "<w:r>$properties<w:t xml:space=`"preserve`">$safeText</w:t></w:r>"
}

function Convert-InlineMarkdownToRuns {
    param([string]$Text)

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return (New-RunXml "")
    }

    $runs = New-Object System.Collections.Generic.List[string]
    $index = 0
    $pattern = '\*\*(.+?)\*\*'
    $matches = [regex]::Matches($Text, $pattern)

    if ($matches.Count -eq 0) {
        $runs.Add((New-RunXml $Text))
        return ($runs -join "")
    }

    foreach ($match in $matches) {
        if ($match.Index -gt $index) {
            $runs.Add((New-RunXml $Text.Substring($index, $match.Index - $index)))
        }

        $runs.Add((New-RunXml $match.Groups[1].Value -Bold))
        $index = $match.Index + $match.Length
    }

    if ($index -lt $Text.Length) {
        $runs.Add((New-RunXml $Text.Substring($index)))
    }

    return ($runs -join "")
}

function New-ParagraphXml {
    param(
        [string]$Text,
        [string]$Style = "BodyText",
        [switch]$Bullet,
        [switch]$BlankAfter
    )

    $paragraphProps = @("<w:pPr>")
    if ($Style) {
        $paragraphProps += "<w:pStyle w:val=`"$Style`"/>"
    }
    if ($Bullet) {
        $paragraphProps += "<w:numPr><w:ilvl w:val=`"0`"/><w:numId w:val=`"1`"/></w:numPr>"
    }
    if ($BlankAfter) {
        $paragraphProps += "<w:spacing w:after=`"160`"/>"
    }
    $paragraphProps += "</w:pPr>"

    $runs = Convert-InlineMarkdownToRuns $Text
    return "<w:p>$($paragraphProps -join '')$runs</w:p>"
}

function Get-ParagraphsFromMarkdown {
    param([string[]]$Lines)

    $paragraphs = New-Object System.Collections.Generic.List[string]

    foreach ($line in $Lines) {
        $trimmed = $line.TrimEnd()

        if ([string]::IsNullOrWhiteSpace($trimmed)) {
            $paragraphs.Add((New-ParagraphXml "" "BodyText"))
            continue
        }

        if ($trimmed.StartsWith("# ")) {
            $paragraphs.Add((New-ParagraphXml $trimmed.Substring(2) "Title" -BlankAfter))
            continue
        }

        if ($trimmed.StartsWith("## ")) {
            $paragraphs.Add((New-ParagraphXml $trimmed.Substring(3) "Heading1" -BlankAfter))
            continue
        }

        if ($trimmed.StartsWith("### ")) {
            $paragraphs.Add((New-ParagraphXml $trimmed.Substring(4) "Heading2"))
            continue
        }

        if ($trimmed.StartsWith("- ")) {
            $paragraphs.Add((New-ParagraphXml $trimmed.Substring(2) "BodyText" -Bullet))
            continue
        }

        if ($trimmed -match '^[0-9]+\.\s') {
            $paragraphs.Add((New-ParagraphXml $trimmed "BodyText" -BlankAfter))
            continue
        }

        $paragraphs.Add((New-ParagraphXml $trimmed "BodyText"))
    }

    return $paragraphs
}

$root = if ($PSScriptRoot) { Split-Path $PSScriptRoot -Parent } else { Get-Location }
$sourcePath = Join-Path $root $SourceMarkdown
$outputPath = Join-Path $root $OutputDocx
$tempRoot = Join-Path $root ".tmp_business_docx"

if (Test-Path $tempRoot) {
    Remove-Item -LiteralPath $tempRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $tempRoot | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "_rels") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "docProps") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "word") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "word\_rels") | Out-Null

$lines = Get-Content -LiteralPath $sourcePath -Encoding UTF8
$paragraphXml = (Get-ParagraphsFromMarkdown $lines) -join "`r`n"
$created = (Get-Date).ToUniversalTime().ToString("s") + "Z"

$contentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
'@

$rels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
'@

$documentRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>
'@

$styles = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        <w:sz w:val="22"/>
        <w:lang w:val="en-US"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:after="120" w:line="276" w:lineRule="auto"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="BodyText">
    <w:name w:val="Body Text"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:after="120" w:line="276" w:lineRule="auto"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
      <w:sz w:val="22"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:basedOn w:val="BodyText"/>
    <w:qFormat/>
    <w:pPr>
      <w:jc w:val="center"/>
      <w:spacing w:after="240"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="32"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="Heading 1"/>
    <w:basedOn w:val="BodyText"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="240" w:after="140"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="28"/>
      <w:color w:val="1F4E79"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="Heading 2"/>
    <w:basedOn w:val="BodyText"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="180" w:after="100"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="24"/>
      <w:color w:val="2F5597"/>
    </w:rPr>
  </w:style>
</w:styles>
'@

$numbering = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0">
    <w:multiLevelType w:val="hybridMultilevel"/>
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/>
      <w:numFmt w:val="bullet"/>
      <w:lvlText w:val=""/>
      <w:lvlJc w:val="left"/>
      <w:pPr>
        <w:tabs>
          <w:tab w:val="num" w:pos="720"/>
        </w:tabs>
        <w:ind w:left="720" w:hanging="360"/>
      </w:pPr>
      <w:rPr>
        <w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/>
      </w:rPr>
    </w:lvl>
  </w:abstractNum>
  <w:num w:numId="1">
    <w:abstractNumId w:val="0"/>
  </w:num>
</w:numbering>
'@

$core = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Online Examination System</dc:title>
  <dc:subject>Business Document</dc:subject>
  <dc:creator>OpenAI Codex</dc:creator>
  <cp:keywords>Online Examination System, Proposal, Business Document</cp:keywords>
  <dc:description>Professional business document for the Online Examination System project.</dc:description>
  <cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">$created</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">$created</dcterms:modified>
</cp:coreProperties>
"@

$app = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office Word</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <Company>OpenAI</Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>16.0000</AppVersion>
</Properties>
'@

$document = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
$paragraphXml
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>
"@

Set-Content -LiteralPath (Join-Path $tempRoot "[Content_Types].xml") -Value $contentTypes -Encoding UTF8
Set-Content -LiteralPath (Join-Path $tempRoot "_rels\.rels") -Value $rels -Encoding UTF8
Set-Content -LiteralPath (Join-Path $tempRoot "word\document.xml") -Value $document -Encoding UTF8
Set-Content -LiteralPath (Join-Path $tempRoot "word\styles.xml") -Value $styles -Encoding UTF8
Set-Content -LiteralPath (Join-Path $tempRoot "word\numbering.xml") -Value $numbering -Encoding UTF8
Set-Content -LiteralPath (Join-Path $tempRoot "word\_rels\document.xml.rels") -Value $documentRels -Encoding UTF8
Set-Content -LiteralPath (Join-Path $tempRoot "docProps\core.xml") -Value $core -Encoding UTF8
Set-Content -LiteralPath (Join-Path $tempRoot "docProps\app.xml") -Value $app -Encoding UTF8

if (Test-Path $outputPath) {
    Remove-Item -LiteralPath $outputPath -Force
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempRoot, $outputPath)

Remove-Item -LiteralPath $tempRoot -Recurse -Force

Write-Output "Created: $outputPath"
