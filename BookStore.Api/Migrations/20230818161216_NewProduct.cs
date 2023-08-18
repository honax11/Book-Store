using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Migrations
{
    public partial class NewProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Product",
                table: "Order",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductsId",
                table: "Order",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Product",
                table: "Order",
                column: "Product");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Books_Product",
                table: "Order",
                column: "Product",
                principalTable: "Books",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Books_Product",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_Product",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Product",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ProductsId",
                table: "Order");
        }
    }
}
