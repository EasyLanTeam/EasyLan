using Devcorner.NIdenticon;
using Devcorner.NIdenticon.BrushGenerators;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;

namespace EasyLan.LogicLayer.Services
{
    public class IconGenerator
    {
        public const string HMACMD5 = "HMACMD5";
        public const string HMACRIPEMD160 = "HMACRIPEMD160";
        public const string HMACSHA1 = "HMACSHA1";
        public const string HMACSHA256 = "HMACSHA256";
        public const string HMACSHA384 = "HMACSHA384";
        public const string HMACSHA512 = "HMACSHA512";
        public const string MACTripleDES = "MACTripleDES";
        public const string MD5 = "MD5";
        public const string RIPEMD160 = "RIPEMD160";
        public const string SHA1 = "SHA1";
        public const string SHA256 = "SHA256";
        public const string SHA384 = "SHA384";
        public const string SHA512 = "SHA512";

        private const string _colorGenBox = "Random1";

        public Bitmap GenerateIcon()
        {
            var randomValue = RandomStr();

            var bg = _colorGenBox.Equals("Random") ? (IBrushGenerator)new RandomColorBrushGenerator() : new StaticColorBrushGenerator(StaticColorBrushGenerator.ColorFromText(randomValue));
            var result = new IdenticonGenerator(MD5)
                .WithSize(250, 250)
                .WithBackgroundColor(Color.Black)
                .WithBlocks(5, 5)
                .WithBlockGenerators(IdenticonGenerator.DefaultBlockGeneratorsConfig)
                .WithBrushGenerator(bg)
                .Create(randomValue);

            return result;
        }

        public string GenerateIconToBase64()
        {
            var icon = GenerateIcon();

            return ConvertBitmapToBase64(icon);
        }

        public Bitmap GenerateIcon(string algorithmBox)
        {
            var randomValue = RandomStr();

            var bg = _colorGenBox.Equals("Random") ? (IBrushGenerator)new RandomColorBrushGenerator() : new StaticColorBrushGenerator(StaticColorBrushGenerator.ColorFromText(randomValue));
            var result = new IdenticonGenerator(algorithmBox)
                .WithSize(400, 400)
                .WithBackgroundColor(Color.Black)
                .WithBlocks(5, 5)
                .WithBlockGenerators(IdenticonGenerator.ExtendedBlockGeneratorsConfig)
                .WithBrushGenerator(bg)
                .Create(randomValue);

            return result;
        }

        private string RandomStr()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[5];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new string(stringChars);
        }

        public static string ConvertBitmapToBase64(Bitmap bitmapImage)
        {
            Bitmap bitmap = bitmapImage;
            MemoryStream ms = new MemoryStream();
            bitmap.Save(ms, ImageFormat.Png);
            byte[] byteImage = ms.ToArray();
            return "data:image/png;base64," + Convert.ToBase64String(byteImage);
        }
    }
}
