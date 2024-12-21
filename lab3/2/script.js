src = [
    "http://10.0.15.21/lab/lab3/images/1.png",
    "http://10.0.15.21/lab/lab3/images/2.png",
    "http://10.0.15.21/lab/lab3/images/3.png",
    "http://10.0.15.21/lab/lab3/images/4.png",
    "http://10.0.15.21/lab/lab3/images/5.png",
    "http://10.0.15.21/lab/lab3/images/6.png",
    "http://10.0.15.21/lab/lab3/images/7.png",
    "http://10.0.15.21/lab/lab3/images/8.png",
    "http://10.0.15.21/lab/lab3/images/9.png"
]

function shuffle() {
    let var1 = document.getElementById("1");
    let var2 = document.getElementById("2");
    let var3 = document.getElementById("3");
    let var4 = document.getElementById("4");
    let var5 = document.getElementById("5");
    let var6 = document.getElementById("6");
    var1.src = src[Math.floor(Math.random() * src.length)];
    var2.src = src[Math.floor(Math.random() * src.length)];
    var3.src = src[Math.floor(Math.random() * src.length)];
    var4.src = src[Math.floor(Math.random() * src.length)];
    var5.src = src[Math.floor(Math.random() * src.length)];
    var6.src = src[Math.floor(Math.random() * src.length)];
}
