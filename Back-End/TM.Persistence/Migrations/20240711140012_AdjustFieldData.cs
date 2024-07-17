using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TM.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AdjustFieldData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdateBy",
                table: "Users",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Users",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreateBy",
                table: "Users",
                newName: "CreatedBy");

            migrationBuilder.RenameColumn(
                name: "CreateAt",
                table: "Users",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdateBy",
                table: "Trees",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Trees",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreateBy",
                table: "Trees",
                newName: "CreatedBy");

            migrationBuilder.RenameColumn(
                name: "CreateAt",
                table: "Trees",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdateBy",
                table: "Assignments",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Assignments",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreateBy",
                table: "Assignments",
                newName: "CreatedBy");

            migrationBuilder.RenameColumn(
                name: "CreateAt",
                table: "Assignments",
                newName: "CreatedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "Users",
                newName: "UpdateBy");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Users",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Users",
                newName: "CreateBy");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Users",
                newName: "CreateAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "Trees",
                newName: "UpdateBy");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Trees",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Trees",
                newName: "CreateBy");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Trees",
                newName: "CreateAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "Assignments",
                newName: "UpdateBy");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Assignments",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Assignments",
                newName: "CreateBy");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Assignments",
                newName: "CreateAt");
        }
    }
}
