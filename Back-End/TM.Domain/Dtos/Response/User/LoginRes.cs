namespace TM.Domain.Dtos.Response.User
{
    public class LoginRes
    {
        public string Token { get; set; } = null!;
        public UserRes User { get; set; } = null!;

        public LoginRes(string Token, UserRes User)
        {
            this.Token = Token;
            this.User = User;
        }
    }
}
