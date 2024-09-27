$(document).ready(function () {
    let formID = 0;


    // Validate data field
    function validateForm(form) {

        const id = form.find('.input-id').val();
        const name = form.find('.input-name').val();
        const label = form.find('.input-label').val();
        const placeholder = form.find('.input-placeholder').val();
        const inputType = form.find('.data-option').val();
    
        // Ẩn tất cả các thông báo lỗi trước
        form.find('.error-data-option').hide();
        form.find('.error-id').hide();
        form.find('.error-name').hide();
        form.find('.error-label').hide();
        form.find('.error-placeholder').hide();
    
        let isValid = true;
    
        if (form.find('.data-option').length && (inputType === undefined || inputType.trim() === "")) {
            form.find('.error-data-option').text('Type không được để trống.').show();
            isValid = false; 
        }
    
        if (form.find('.input-id').length && (id === undefined || id.trim() === "")) {
            form.find('.error-id').text('ID không được để trống.').show();
            isValid = false;
        }
    
        if (form.find('.input-name').length && (name === undefined || name.trim() === "")) {
            form.find('.error-name').text('Name không được để trống.').show();
            isValid = false; 
        }
    
        if (form.find('.input-label').length && (label === undefined || label.trim() === "")) {
            form.find('.error-label').text('Label không được để trống.').show();
            isValid = false;
        }
    
        if (form.find('.input-placeholder').length && (placeholder === undefined || placeholder.trim() === "")) {
            form.find('.error-placeholder').text('Placeholder không được để trống.').show();
            isValid = false;
        }
    
        return isValid;
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
    
            $(`#placeholder-${formID}`).attr('type', selectedValue);
        });
    
        // Ẩn danh sách nếu click ra ngoài
        $(document).click(function(event) {
            if (!$(event.target).closest(`#data-type-${formID}`).length) {
                $(`#data-type-options-${formID}`).hide();
            }
        });
    }
    

    // Load data cua form tu local storage
    loadDataFromLocalStorage();


    // Get even click on button
    function getEvenOnclickButton(){
        $(".button-group button").click(function () {
            const type = $(this).data("type"); 
            if (type) { 
                createFormContainer(type);
                saveTypeToLocalStorage(type);
            }
        });
    }
    getEvenOnclickButton();


    // Get form type name
    function getFormType(string) {
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
                <div class="form-header"> 
                    <span class="form-name">${getFormType(type)} Field</span>
                    <i class="icon x"></i>
                </div>
        `;

        // Form cho kiểu input
        if (type === "input") {
            formContent += `
                <div class="form-colum ">
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
                    
                    <span class="error-data-option" ></span>
                </div>
                <div class="form-colum">
                    <div class="form-row">
                        <span id="label">Label</span>
                        <input type="text" class="input-label">
                    </div>
                    <span class="error-label" ></span>
                </div>
                <div class="form-colum">
                    <div class="form-row">
                        <span id="label">Name</span>
                        <input type="text" class="input-name">
                    </div>
                    <span class="error-name" ></span> 
                </div>
                <div class="form-colum">
                    <div class="form-row">
                        <span id="label">Id</span>
                        <input type="text" class="input-id">
                    </div>
                    <span class="error-id" ></span>
                </div>
                <div class="form-colum">
                    <div class="form-row">
                        <span id="label">Placeholder</span>
                        <input type="text" class="input-placeholder" id="placeholder-${formID}">
                    </div>
                    <span class="error-placeholder" ></span>
                </div>
                <div class="form-colum">
                    <div class="form-row">
                        <span id="label">Require</span>
                        <input type="checkbox" class="input-require">
                    </div>
                    <span class="error-require" ></span>
                </div>
            `;
        }

        // Form cho kiểu textarea
        if (type === "textarea") {
            formContent += `
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Label</span>
                    <input type="text" class="input-label">
                </div>
                <span class="error-label"></span>
            </div>
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Name</span>
                    <input type="text" class="input-name">
                </div>
                <span class="error-name"></span> 
            </div>
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Id</span>
                    <input type="text" class="input-id">
                </div>
                <span class="error-id"></span>
            </div>
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Placeholder</span>
                    <input type="text" class="input-placeholder" id="placeholder-${formID}">
                </div>
                <span class="error-placeholder"></span>
            </div>
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Require</span>
                    <input type="checkbox" class="input-require">
                </div>
                <span class="error-require"></span>
            </div>
            `;
        }

        // Form cho kiểu button
        if (type === "button") {
            formContent += `
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Label</span>
                    <input type="text" class="input-label">
                </div>
                <span class="error-label"></span>
            </div>
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Name</span>
                    <input type="text" class="input-name">
                </div>
                <span class="error-name"></span> 
            </div>
            <div class="form-colum">
                <div class="form-row">
                    <span id="label">Id</span>
                    <input type="text" class="input-id">
                </div>
                <span class="error-id"></span>
            </div>
            `;
        }

        formContent += `</form>`;

        // Thêm form moi
        newFormContainer.html(formContent);
        $('.form').append(newFormContainer);

        // Animation thêm form
        newFormContainer.hide().appendTo('.form').fadeIn(500, function() {
            $('html, body').animate({ scrollTop: $(document).height() }, 1000);
            newFormContainer.addClass('show'); 
        });

        choiceDataTypeOP(formID);

        animationDragForm();
    }


    // Lưu dữ liệu vào Local Storage
    function saveDataFormToLocalStorage() {
        $('#save-create-form').click(function () {
            let existingData = JSON.parse(localStorage.getItem('formData')) || []; 

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
    
                    const exists = existingData.some(
                        existingForm => existingForm.id === formData.id);
    
                    if (exists) {

                        existingData = existingData.map(existingForm =>
                            existingForm.id === formData.id ? formData : existingForm
                        );
                    } else {
                        
                        existingData.push(formData);
                    }
                }
            });

            localStorage.setItem('formData', JSON.stringify(existingData));
            
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


    // Animation kéo thả form
    function animationDragForm(){
        $(".form").sortable({
            update: function() {
                saveOrderToLocalStorage();
            }
        });
    }


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


    // Load lai thu tu form da luu truoc do
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


    // Xoa 1 form neu click vao bieu tuong xoa
    function deleteOneForm() {  
        let formData = JSON.parse(localStorage.getItem('formData')) || [];
    
        $(document).on('click', '.form-header .icon.x', function() {
            const formContainer = $(this).closest('.form-container');
            const formId = formContainer.find('.input-id').val(); 

            formContainer.remove();
            
            formData = formData.filter(item => item.id !== formId); 
            localStorage.setItem('formData', JSON.stringify(formData)); 
    
            saveOrderToLocalStorage();
        });
    }
    deleteOneForm();


    // Reset dữ liệu form
    function resetDataForm() {
        $('#reset').click(function () {
            
            const formContainers = $('.form-container').get().reverse(); 
    
            formContainers.forEach(function(element, index) {
                $(element).delay(250 * index).fadeOut(500, function() {
                    $(this).remove();
                });
            });


            formID = 0;
            localStorage.removeItem('formData');
            localStorage.removeItem('formTypes');
            localStorage.removeItem('formOrder');
        });
    }    
    resetDataForm();
});
