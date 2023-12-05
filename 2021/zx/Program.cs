
Int16[] a = new Int16[] {199,200,208,210,200,207,240,269,260,263};

byte[] output = new byte[a.Length<<1];
for (int i=0;i<a.Length;i++){
    byte h = (byte) ((a[i] & 0xff00) >> 4);
    byte l = (byte)(a[i] & 0xff);
    output[i<<1] = h;
    output[(i<<1)+1] = l;
}

File.WriteAllBytes("memory.bin", output);

Console.WriteLine(string.Join("", output.Select(i => i.ToString("x2"))));