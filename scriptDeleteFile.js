$(document).ready(function () {
    let timerInterval;
    Swal.fire({
      title: "กำลังดำเนินการ",
      html: "โปรดรอสักครู่ <strong></strong> วินาที.",
      timer: 10000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("strong");
        timerInterval = setInterval(() => {
          b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    const urlParms = new URLSearchParams(window.location.search)
    const id = urlParms.get('id')
    deletefile(id); 
  });
  
  function deletefile(id) {
    try {
      $.ajax({
        url: `${urlAPI}?type=deleteData&dataId=${id}`,
        type: "GET",
        dataType: "json", // added data type
        success: function (res) {
          console.log(res.msg);
        if (res.msg == "SUCCESS") {
        Swal.fire({
              title: "ลบข้อมูล",
              text: "ระบบลบข้อมูลเรียบร้อย",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              // cancelButtonColor: '#d33',
              confirmButtonText: "ตกลง",
            }).then(async (result) => {
              if (result.isConfirmed) {
                  window.close()
              }
            });
          } else {    
            Swal.fire({
              title: "ข้อมูลถูกลบจากระบบแล้ว",
              text: `${res.msg}`,
              icon: "info",
              showCancelButton: false,
              confirmButtonColor: "#d33",
              // cancelButtonColor: '#d33',
              confirmButtonText: "ตกลง",
            }).then((result) => {
              if (result.isConfirmed) {   
                window.close()
              }
            });
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  
