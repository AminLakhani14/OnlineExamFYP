# LMS Architecture & Design Document (Phase 0)

## 1. System Overview

The Online Examination & Learning Management System (LMS) is designed as a multi-tenant platform where each **School** acts as a tenant. The system supports three primary user roles: **Admin**, **Teacher**, and **Student**.

## 2. Multi-Tenancy Model

- **Isolation Strategy**: Logical isolation using a `SchoolId` column in all tenant-specific tables.
- **Tenant**: A `School` entity represents a tenant (e.g., "City School", "Future Academy").
- **Data Ownership**:
  - Users belong to a specific School.
  - Exams, results, and courses are scoped to a School.

## 3. User Roles & Permissions

| Role            | Permissions                                                                                                     |
| :-------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Super Admin** | Full system access. Manage Schools, Create Admins, and view global statistics (all students/teachers/progress). |
| **Admin**       | School-level manager (Principal/Head). Monitor progress of students and teachers within their specific school.  |
| **Teacher**     | Create exams (MCQ/Subjective), upload lectures, mark attendance, and grade assignments.                         |
| **Student**     | Attempt exams, view results, access learning materials, and view attendance.                                    |

## 4. Entity Relationship Diagram (Conceptual)

### Core Entities:

1. **School**: `ID`, `Name`, `Address`, `SubscriptionStatus`.
2. **User (Register)**: `ID`, `SchoolId`, `Type` (Admin/Teacher/Student), `UserName`, `Email`, `Password`.
3. **Class**: `ID`, `SchoolId`, `Grade`, `Section`.
4. **Subject**: `ID`, `SchoolId`, `Name`.
5. **Question (MCQ/QA)**: Linked to `Subject`, `Teacher (Creator)`, and `SchoolId`.
6. **Exam**: Collection of questions, linked to a `Class`.
7. **ExamResult**: Linked to `Student`, `Exam`, and `SchoolId`.

## 5. AI Integration Points (Future Implementation)

- **Exam Evaluating Service**: AI will be implemented here later to check subjective answers.
- **Quiz Generator**: AI will be implemented here later to generate questions from PDFs/Notes.
- **Progress Feedback**: AI will be implemented here later to provide personalized student reports.

## 6. API Strategy

- **Base URL**: `https://localhost:7040/api/`
- **Authentication**: JWT (JSON Web Tokens) with Role-based access control (RBAC).
- **Standards**: RESTful endpoints with JSON payloads.
