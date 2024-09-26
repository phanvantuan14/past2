$(document).ready(function () {
    let formID = 0;

    function validateForm(form) {
        const id = form.find('.input-id').val().trim();
        const name = form.find('.input-name').val().trim();
        const label = form.find('.input-label').val().trim();

        if (!id) {
            alert('ID không được để trống.');
            return false;
        }

        if (!name) {
            alert('Name không được để trống.');
            return false;
        }

        if (!label) {
            alert('Label không được để trống.');
            return false;
        }

        return true; // Tất cả các trường hợp hợp lệ
    }

    // Chọn kiểu dữ liệu
    const choiceDataTypeOP = (formID) => {
        $(`#data-type-${formID}`).click(function() {
            $(`#data-type-options-${formID}`).toggle();
        });

        // Cập nhật giá trị của ô input khi chọn một option
        $(`#data-type-options-${formID} li`).click(function() {
            const selectedValue = $(this).attr('data-value'); 
            $(`#data-option-${formID}`).val(selectedValue); 
        });

        // Ẩn danh sách nếu click ra ngoài
        $(document).click(function(event) {
            if (!$(event.target).closest(`#data-type-${formID}`).length) {
                $(`#data-type-options-${formID}`).hide();
            }
        });
    }

    loadDataFromLocalStorage();

    $(".button-group button").click(function () {
        const type = $(this).data("type"); 
        if (type) { 
            createFormContainer(type);
            saveTypeToLocalStorage(type);
        }
    });

    // Get form name
    function capitalizeFirstLetter(string) {
        if (string) { 
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return ''; 
    }

    // Tạo form
    function createFormContainer(type) {
        formID++;

        const newFormContainer = $('<div class="form-container"></div>');
        let formContent = `
            <form id="form-action">
                <span class="form-name">${capitalizeFirstLetter(type)} Field</span>
        `;

        // Form cho kiểu input
        if (type === "input") {
            formContent += `
                <div class="form-row position-item">
                    <span class="label">Type</span>
                    <input class="data-option" id="data-option-${formID}" type="text" readonly>
                    <div class="data-type" id="data-type-${formID}"> 
                        <i class="icon chevron down"></i>
                        <ul class="data-type-options" id="data-type-options-${formID}">
                            <li data-value="int">Number</li>
                            <li data-value="text">Text</li>
                            <li data-value="date">Date</li>
                            <li data-value="time">Time</li>
                            <li data-value="datetime-local">Date time Local</li>
                        </ul>
                    </div>
                </div>
                <div class="form-row">
                    <span id="label">Label</span>
                    <input type="text" class="input-label">
                </div>
                <div class="form-row">
                    <span id="label">Name</span>
                    <input type="text" class="input-name">
                </div>
                <div class="form-row">
                    <span id="label">Id</span>
                    <input type="text" class="input-id">
                </div>
                <div class="form-row">
                    <span id="label">Placeholder</span>
                    <input type="text" class="input-placeholder">
                </div>
                <div class="form-row">
                    <span id="label">Require</span>
                    <input type="checkbox" class="input-require">
                </div>
            `;
        }

        // Form cho kiểu textarea
        if (type === "textarea") {
            formContent += `
                <div class="form-row">
                    <span id="label">Label</span>
                    <input type="text" class="input-label">
                </div>
                <div class="form-row">
                    <span id="label">Name</span>
                    <input type="text" class="input-name">
                </div>
                <div class="form-row">
                    <span id="label">Id</span>
                    <input type="text" class="input-id">
                </div>
                <div class="form-row">
                    <span id="label">Placeholder</span>
                    <input type="text" class="input-placeholder">
                </div>
                <div class="form-row">
                    <span id="label">Require</span>
                    <input type="checkbox" class="input-require">
                </div>
            `;
        }

        // Form cho kiểu button
        if (type === "button") {
            formContent += `
                <div class="form-row">
                    <span id="label">Label</span>
                    <input type="text" class="input-label">
                </div>
                <div class="form-row">
                    <span id="label">Name</span>
                    <input type="text" class="input-name">
                </div>
                <div class="form-row">
                    <span id="label">Id</span>
                    <input type="text" class="input-id">
                </div>
            `;
        }

        formContent += `</form>`;

        // Thêm form
        newFormContainer.html(formContent);
        $('.form').append(newFormContainer);

        // Animation thêm form
        newFormContainer.hide().appendTo('.form').slideDown(500, function() {
        $('html, body').animate({ scrollTop: $(document).height() }, 2000);
        newFormContainer.addClass('show'); 
        });

        choiceDataTypeOP(formID);
        $(".form").sortable();
    }

    // Lưu dữ liệu vào Local Storage
    function saveDataFormToLocalStorage() {
        $('#save-create-form').click(function () {
            let existingData = JSON.parse(localStorage.getItem('formData')) || []; 
            let formAdded = false;

            $('.form-container').each(function() {
                const form = $(this);
                if (validateForm(form)){
                    const id = $(this).find('.input-id').val();
                    const name = $(this).find('.input-name').val();
                    const label = $(this).find('.input-label').val();
                    const require = $(this).find('.input-require').is(':checked');
                    const placeholder = $(this).find('.input-placeholder').val();
                    const typeInput = $(this).find('.data-option').val(); 

                    const formData = {
                        id: id,
                        name: name,
                        label: label,
                        typeInput: typeInput,
                        placeholder: placeholder,
                        require: require,
                        type: $(this).find('.form-name').text().replace(' Field', '').toLowerCase(),
                    };
    
                    const exists = existingData.some(existingForm => existingForm.id === formData.id);
    
                    if (!exists) {
                        existingData.push(formData);
                        formAdded = true;
                    }
                }
            });

            if (formAdded) {
                localStorage.setItem('formData', JSON.stringify(existingData));
            }
        });
    }

    saveDataFormToLocalStorage();

    // Lưu loại form vào local storage
    function saveTypeToLocalStorage(type) {
        let existingTypes = JSON.parse(localStorage.getItem('formTypes')) || [];
        if (!existingTypes.includes(type)) {
            existingTypes.push(type);
            localStorage.setItem('formTypes', JSON.stringify(existingTypes));
        }
    }

    // Tải dữ liệu từ Local Storage
    function loadDataFromLocalStorage() {
        let existingData = JSON.parse(localStorage.getItem('formData')) || []; 

        existingData.forEach(formData => {
            createFormContainer(formData.type); 
            const lastForm = $('.form-container').last(); 
            
            // Cập nhật các giá trị cho form
            lastForm.find('.input-id').val(formData.id);
            lastForm.find('.input-name').val(formData.name);
            lastForm.find('.input-label').val(formData.label);
            lastForm.find('.input-placeholder').val(formData.placeholder);
            lastForm.find('.input-require').prop('checked', formData.require);
            lastForm.find('.data-option').val(formData.typeInput); 
        });
    }


    $(".form").sortable({
        update: function(event, ui) {
            saveOrderToLocalStorage();
        }
    });

    // Hàm lưu thứ tự vào local storage
    function saveOrderToLocalStorage() {
        const formOrder = [];
        $('.form-container').each(function() {
            const id = $(this).find('.input-id').val();
            if (id) {
                formOrder.push(id);
            }
        });
        localStorage.setItem('formOrder', JSON.stringify(formOrder));
    }


    function loadOrderFromLocalStorage() {
        const formOrder = JSON.parse(localStorage.getItem('formOrder')) || [];
        if (formOrder.length > 0) {
            const formContainer = $('.form');
            formOrder.forEach(id => {
                const form = $('.form-container').filter(function() {
                    return $(this).find('.input-id').val() === id;
                });
                if (form.length) {
                    formContainer.append(form);
                }
            });
        }
    }
    loadOrderFromLocalStorage();




    // Reset dữ liệu form
    function resetDataForm() {
        $('#reset').click(function () {
            $('.form').html(''); 
            formID = 0;

            localStorage.removeItem('formData');
            localStorage.removeItem('formTypes');
        });
    }
    
    resetDataForm();
});
