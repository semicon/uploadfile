
$(document).ready(function () {
  let timerInterval;
  Swal.fire({
    title: "กำลังบันทึกข้อมูล",
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
  Dropdown();

  $("#courseP").select2({
    theme: "bootstrap-5",
    width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
    placeholder: $( this ).data( 'placeholder' ),
    // allowClear: true,
    // closeOnSelect: false,
    dropdownParent: $('#courseP').parent(),
    language: {
      noResults: function () {
        return "ไม่พบข้อมูล";
      },
    },
  });
});

function loadstart() {
  document.querySelector(".loader-container").classList.remove("d-none");
}
function loadend() {
  document.querySelector(".loader-container").classList.add("d-none");
}

//ตรวจสอบขนาดไฟล์อัพโหลดและแสดงรูปภาพ อ.รองหลวง
function fileValidation() {
  var fileInput = document.querySelector("#file_image");
  //    console.log(fileInput)
  var filePath = fileInput.value;
  //    console.log(filePath)
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.pdf|\.xlsx)$/i;

  // console.log(fileInput.files[0])
  if (fileInput.files[0] != undefined) {
    if (fileInput.files[0].size > 5 * 1048576) {
      Swal.fire({
        position: "top",
        icon: "info",
        title: "คำเตือน !",
        text: "ขนาดไฟล์ต้องไม่เกิน 5 mb",
        confirmButtonColor: "#000",
        confirmButtonText: "ตกลง!",
      });

      fileInput.value = "";
    } else {
      if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "กรุณาแนบไฟล์ที่กำหนดเท่านั้น!!",
          showConfirmButton: false,
          timer: 1500,
        });
        fileInput.value = "";

        return false;
      }
    }
  }
}

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          // showError(event);
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

/** ฟังก์ชั่นแสดงข้อความเมื่อ Error (ใช้ SweetAlert2) */
function showError(e) {
  Swal.fire({
    title: JSON.stringify(e),
    icon: "warning",
    // timer: 1500,
    confirmButtonText: "ตกลง",
  });
}

function hasDuplicateFileNames(fileName) {
  // console.log(fileName);
  // console.log(fileDataArray);
  const index = fileDataArray.findIndex((item) => item.name === fileName);
  // console.log(index);
  if (index != -1) {
    return true;
  } else {
    return false;
  }
}
