$(document).ready(function () {
  $(".button-group button").click(function () {
    const type = $(this).data("type"); 
    createFormContainer(type);
  });

  function createFormContainer(type) {
    const newFormContainer = $('<div class="form-container"></div>');

    let formContent = `
            <form id="form-action">
                <span class="form-name">${capitalizeFirstLetter(type)} Field</span>

                <div class="form-row">
                    <span id="lable">Type</span>
                    <input id="data-option" type="text">
                    <div id="data-type">
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                </div>

                <div class="form-row">
                    <span id="lable">Lable</span>
                    <input type="text">
                </div>

                <div class="form-row">
                    <span id="lable">Name</span>
                    <input type="text">
                </div>

                <div class="form-row">
                    <span id="lable">Id</span>
                    <input type="text">
                </div>

                <div class="form-row">
                    <span id="lable">Placeholder</span>
                    <input type="text">
                </div>

                <div class="form-row">
                    <span id="lable">Require</span>
                    <input type="checkbox">
                </div>
            </form>`;

    newFormContainer.html(formContent);
    $(".form").append(newFormContainer);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
