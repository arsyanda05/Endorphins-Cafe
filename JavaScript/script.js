//untuk contact
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function(event){
      event.preventDefault();
      alert('Form berhasil dikirim!');
      form.reset();
  });
}

//menu langsung dr halaman menu
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const menudariURL = urlParams.get('menu');
  if(menudariURL){
    document.getElementById('menu').value = menudariURL;
  }
});


let metodeOrder = "";
function pilihMetodeOrder(metode){
   metodeOrder = metode;
   document.getElementById('OrderForm').style.display ="block";

   if(pilihMetodeOrder === "delivery"){
    document.getElementById('bag-delivery').style.display = "block";
    document.getElementById('bag-dinein').style.display = "none";
   } else {
    document.getElementById('bag-dinein').style.display = "block";
    document.getElementById('bag-delivery').style.display = "none";
   }
}

//untuk  order
function deliveryOrder(){
  var nama =document.getElementById('nama').value;
  var menu =document.getElementById('menu').value;
  var jumlah =document.getElementById('jumlah').value;
  var alamat =document.getElementById('lokasi').value;
  var pembayaran =document.getElementById('transaksi').value;
  var nomormeja = document.getElementById('nomormeja').value;

  if(nama === ''|| menu ==='' || jumlah === ''){
    alert('Mohon segera lengkapi data diri anda!');
    return false;
  }
  if(metodeOrder === "delivery" && (alamat === ''|| pembayaran=== '')){
    alert('Untuk Delivery, isi alamat dan metode pembayaran anda!');
    return false;
  }
  if(metodeOrder === "dinein" && nomormeja === ''){
    alert('Untuk Dine In, isi nomor meja!');
    return false;
  }

  let hasil = "Pesanan diterima!\n\n" +
              "Nama Lengkap : " +nama +"\n" +
              "Menu yang Dipesan : " +menu +"\n" +
              "Jumlah : " +jumlah +"\n";
  if(metodeOrder === "delivery"){
    hasil += "Alamat :" + alamat + "\nMetode Pembayaran :" + pembayaran + "\nJenis : Delivery"
  } else {
    hasil += "Nomor Meja :" + nomormeja + "\nJenis : Dine In";
  }

  alert(hasil + "\nTerimakasih! Pesananmu akan segera kami proses.");
  document.getElementById('OrderForm').reset();
  document.getElementById('OrderForm').style.display = "none";
  return false;
}
