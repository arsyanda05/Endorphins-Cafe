//untuk contact
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function(event){
      event.preventDefault();
      alert('Form berhasil dikirim!');
      form.reset();
  });
}

// Penyimpanan menu
function tambahKeKeranjang(nama, harga) {
  var keranjang = localStorage.getItem("keranjang");
  if (keranjang) {
    keranjang = JSON.parse(keranjang);
  } else {
    keranjang = [];
  }

  // Cek apakah sudah ada 
  var sudahAda = false;
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].nama === nama) {
      keranjang[i].jumlah += 1;
      sudahAda = true;
      break;
    }
  }

  if (!sudahAda) {
    keranjang.push({ nama: nama, harga: harga, jumlah: 1 });
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  alert(nama + " ditambahkan ke pesanan Anda!");
}

//Halaman Order – tampilkan data dari keranjang
window.onload = function() {
  if (document.getElementById('menu')) {
    var keranjang = localStorage.getItem("keranjang");
    if (keranjang) {
      keranjang = JSON.parse(keranjang);

      keranjang = keranjang.filter(item => item.nama && item.harga);

      var menuText = "";
      for (var i = 0; i < keranjang.length; i++) {
        var item = keranjang[i];
        menuText += item.nama + " (" + item.jumlah + "x - Rp " + item.harga + ")";
        if (i < keranjang.length - 1) {
          menuText += ", ";
        }
      }
      document.getElementById('menu').value = menuText;

      localStorage.removeItem("keranjang");
    }
  }
};

// Fungsi Order
let metodeOrder = "";

function pilihMetodeOrder(event, metode){
    event.preventDefault(); 
    metodeOrder = metode;

    if(metode === "delivery"){
        document.getElementById('bag-delivery').style.display = "block";
        document.getElementById('bag-dinein').style.display = "none";
    } else {
        document.getElementById('bag-dinein').style.display = "block";
        document.getElementById('bag-delivery').style.display = "none";
    }
}

// Fungsi submit order
function submitOrder(event){
    event.preventDefault();

    var nama = document.getElementById('nama').value;
    var menu = document.getElementById('menu').value;
    var alamat = document.getElementById('lokasi').value;
    var pembayaran = document.getElementById('transaksi').value;

    if(nama === '' || menu === ''){
        alert('Harap isi nama dan menu terlebih dahulu!');
        return false;
    }
    if(metodeOrder === "delivery" && (alamat === '' || pembayaran === '')){
        alert('Untuk Delivery, isi alamat dan metode pembayaran anda!');
        return false;
    }
    if(metodeOrder === "dinein" && nomormeja === ''){
        alert('Untuk Dine In, isi nomor meja!');
        return false;
    }

    let orderData = localStorage.getItem("orderData");
    orderData = orderData ? JSON.parse(orderData) : [];

    orderData.push({
        nama: nama,
        menu: menu,
        alamat: alamat,
        pembayaran: pembayaran,
        nomormeja: nomormeja,
        metode: metodeOrder,
        tanggal: new Date().toISOString()
    });

    localStorage.setItem("orderData", JSON.stringify(orderData));

    let hasil = "Pesanan diterima!\n\n" +
                "Nama Lengkap : " + nama + "\n" +
                "Menu yang Dipesan : " + menu + "\n";

    if(metodeOrder === "delivery"){
        hasil += "Alamat : " + alamat + "\nMetode Pembayaran : " + pembayaran + "\nJenis : Delivery";
    } else {
        hasil += "Nomor Meja : " + nomormeja + "\nJenis : Dine In";
    }

    alert(hasil + "\nTerimakasih! Pesananmu akan segera kami proses.");

    document.getElementById('OrderForm').reset();
    document.getElementById('menu').value = "";
    document.getElementById('bag-delivery').style.display = "none";
    document.getElementById('bag-dinein').style.display = "none";

   
    localStorage.removeItem("keranjang");
}

// Fungsi lihat detail menu
function lihatDetail(nama, gambar, deskripsi, harga){
    document.getElementById('detail-img').src = gambar;
    document.getElementById('detail-nama').innerText = nama;
    document.getElementById('detail-deskripsi').innerText = deskripsi;
    document.getElementById('detail-harga').innerText = harga;
    document.getElementById('detail-box').style.display = "block";

    var tombolOrder = document.getElementById('btnOrderNow');
    tombolOrder.href = "#";
    tombolOrder.onclick = function (){
        tambahKeKeranjang(nama, harga);
    };
}

function tutupDetail(){
    document.getElementById('detail-box').style.display = "none";
}
