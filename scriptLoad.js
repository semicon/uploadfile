/**ป้องกันการ submit หน้าว่าง */
function preventFormSubmit() {
  var forms = document.querySelectorAll("form");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
}
window.addEventListener("load", preventFormSubmit);

async function Dropdown() {
  try {
    $.ajax({
      url: `${urlAPI}?type=namelist`,
      type: "GET",
      dataType: "json", // added data type
      success: function (res) {
        // console.log(res);
        $("#databox").removeClass("d-none");
        dropdownListlevel(res);
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1500          
        });
        Toast.fire({
          icon: "success",
          title: "ดำเนินการเรียบร้อย",
          
        });
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function dropdownListlevel(data) {
  const categories = data;
 
  const idInput = document.getElementById("idP");
  const nameInput = document.getElementById("nameP");
  const emailInput = document.getElementById("emailP");
  const courseInput = document.getElementById("courseP");

  const idList = document.getElementById("idlist");
  const nameList = document.getElementById("namelist");
  const emailList = document.getElementById("emaillist");

  // Populate initial category list
  categories[0].forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    idList.appendChild(option);
  });
  categories[1].forEach((category) => {
    const option = document.createElement("option");

      option.text = category.course;
      option.value = category.course;
    
    courseInput.appendChild(option);
  });

  // Handle category input change
  idInput.addEventListener("input", () => {
    const selectedCategory = categories[0].find(
      (category) => category.id === idInput.value
    );
    //  console.log(selectedCategory)

    // Clear and populate item list
    nameList.innerHTML = "";
    emailList.innerHTML = "";
    if (selectedCategory) {
      nameInput.value = selectedCategory.name;
      emailInput.value = selectedCategory.email;
      nameInput.disabled = false;
      emailInput.disabled = false;
    } else {
      nameInput.value = "";
      nameInput.disabled = true;
      emailInput.value = "";
      emailInput.disabled = true;
    }
  });
}
