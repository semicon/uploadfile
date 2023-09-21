let fileDataArray = [];
let maxfile = 5; //จำนวนไฟล์ที่ upload

$("#file_image").change(function () {
  const fileInput = this;
  const filePreviews = $("#filePreviews");
  // console.log(fileDataArray)
  // console.log(fileDataArray.length)
  if (fileDataArray.length + 1 > maxfile) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      // timer: 1000,
    });
    Toast.fire({
      icon: "info",
      title: `อัพโหลดไฟล์ได้สูงสุด ${maxfile} ไฟล์`,
    });
  } else {
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];

      const filecheck = hasDuplicateFileNames(file.name);

      if (filecheck == true) {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: true,
          // timer: 1000,
        });
        Toast.fire({
          icon: "warning",
          title: `<h5 style='color:red'>อัพโหลดไฟล์ซ้ำ</h5>`,
        });
      } else {
        const fileSize = (file.size / 1024).toFixed(2) + " KB";
        const reader = new FileReader();

        reader.onload = function (event) {
          let iconClass = getFileIconClass(file.name);
          const filePreview = document.createElement("div");
          filePreview.className = "file-preview mb-2 position-relative";
          filePreview.innerHTML = `
           <div>
            ${
              file.type.startsWith("image")
                ? `<a href="${event.target.result}" data-lightbox="image-group"><img src="${event.target.result}" width="50px"></a>`
                : `${iconClass}`
            }
                    <p class="file-name">${file.name.substring(0, 10)}...</p>
                    <p class="file-name">${fileSize}</p>                      
                    <button class="btn btn-outline-danger border-0 btn-sm delete-button position-absolute top-0 start-100 translate-middle"><i class='bx bx-x-circle bx-md'></i></button>
            </div>        
                `;
          filePreviews.append(filePreview);
          // console.log(event.target.result)
          fileDataArray.push({
            data: reader.result.split(",")[1],
            name: file.name,
            type: file.type,
          });
          filePreview
            .querySelector(".delete-button")
            .addEventListener("click", function () {
              const index = fileDataArray.findIndex(
                (item) => item.name === file.name
              );
              // console.log(index);
              if (index !== -1) {
                fileDataArray.splice(index, 1);
                // console.log(fileDataArray);
              }
              filePreview.remove();
            });
        };
        reader.readAsDataURL(file);
      }
    }
  }
});

function getFileIconClass(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  let iconMappings = {
    pdf: `<box-icon type='solid' color='red' name='file-pdf' size='80px'></box-icon>`,
    doc: `<box-icon type='solid' color="blue" name='file-doc' size='80px'></box-icon>`,
    docx: `<box-icon type='solid' color='blue' name='file-doc' size='80px'></box-icon>`,
    xls: `<i class="fa-regular fa-file-excel" style="color: #048b2d;font-size:80px"></i>`,
    xlsx: `<i class="fa-regular fa-file-excel" style="color: #048b2d;font-size:80px"></i>`,
    ppt: `<i class="fa-solid fa-file-powerpoint" style="color: #e6a433;font-size:80px"></i>`,
    pptx: `<i class="fa-solid fa-file-powerpoint" style="color: #e6a433;font-size:80px"></i>`,
    txt: `<box-icon type='solid' name='file-txt' size='80px' ></box-icon>`,
  };
  return iconMappings[ext];
}

function getAllElmForm() {
  const form = document.getElementById("user_form");
  //ตรวจสอบข้อมูลก่อนการบันทึก
  if (!form.checkValidity()) {
    return showError("โปรดกรอกข้อมูลให้ครบ");
  }
  if (fileDataArray.length < 1) {
    return showError("โปรดอัปโหลดไฟล์");
  }

  $("#btn_1").hide();
  $("#btn_2").show();
  let obj = {};
  let formData = $("#user_form").serializeArray();
  formData.forEach((el) => (obj[el.name] = el.value));

  //ชื่อไฟล์ที่ upload "file_image"
  let uploadFile = {};
  for (i = 0; i < fileDataArray.length; i++) {
    uploadFile["file_image" + (i + 1)] = fileDataArray[i];
  }
  obj.uploadFile = uploadFile;
  // console.log(obj);
  let formDataS = JSON.stringify(obj);
  // console.log(formDataS);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${urlAPI}?action=saveDataNew`,
    headers: {},
    data: formDataS,
    mode: "no-cors",
  };
  // console.log(config)

  axios.request(config).then((response) => {
    // console.log(JSON.stringify(response.data));
    const msgResponse = response.data;

    if (msgResponse.msg == "SUCCESS") {
      $("#btn_2").hide();
      $("#btn_1").show();
      $("#courseP").val(null).trigger("change");
      // $("#picdata").hide();
      // $("#picdata").attr("src", "");
      // $("#file_input_help").html("");
      $("#filePreviews").html("");
      fileDataArray = [];
      document.getElementById("user_form").reset();
      document
        .getElementsByClassName("needs-validation")[0]
        .classList.remove("was-validated");

      Swal.fire({
        title: "บันทึกข้อมูล",
        text: "ระบบบันทึกข้อมูลเรียบร้อย",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        // cancelButtonColor: '#d33',
        confirmButtonText: "ตกลง",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // tableonload(msgResponse.id);
        }
      });
    } else {
      $("#btn_2").hide();
      $("#btn_1").show();
      $("#courseP").val(null).trigger("change");
      // $("#picdata").hide();
      document.getElementById("user_form").reset();
      // $("#picdata").attr("src", "");
      // $("#file_input_help").html("");
      $("#filePreviews").html("");
      fileDataArray = [];
      document
        .getElementsByClassName("needs-validation")[0]
        .classList.remove("was-validated");

      Swal.fire({
        title: "บันทึกไม่สำเร็จ",
        text: `${msgResponse.msg}`,
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#d33",
        // cancelButtonColor: '#d33',
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          // tableonload(msgResponse.id);
        }
      });
    }
  });
}
