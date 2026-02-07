import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

const DEPARTMENTS = [
  "Engineering",
  "Sales",
  "Design",
  "HR",
  "Marketing",
  "Finance",
] as const;

export class CreateEmployeeDto {
  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsEmail()
  email: string;

  @IsIn(DEPARTMENTS)
  department: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
