function sendRequest() {
  const formData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    comment: document.getElementById("comment").value || '',
  };

  if (!(formData.name && (formData.phone || formData.email))) {
    console.warn('Name and phone or email should be provided');
    return;
  }
  // DATA: name, email, phone, comment
  fetch("http://localhost:3000/request", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      const okElem = document.getElementById("status-ok");
      const errElem = document.getElementById("status-err");
      okElem.classList.remove("status-visible");
      errElem.classList.remove("status-visible");

      if (jsonResponse.success) {
        okElem.classList.add("status-visible");
      } else {
        errElem.classList.add("status-visible");
      }
    });
}
