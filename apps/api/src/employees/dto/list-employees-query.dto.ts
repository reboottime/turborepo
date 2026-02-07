import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

const DEPARTMENTS = [
  "Engineering",
  "Sales",
  "Design",
  "HR",
  "Marketing",
  "Finance",
] as const;

export class ListEmployeesQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(DEPARTMENTS)
  department?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
