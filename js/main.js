$(document).ready(function () {
    let formID = 0;

    // Load data cua form tu local storage
    loadDataFromLocalStorage();


    // Get even click on button
    function getEvenOnclickButton(){
        $(".button-group button").on("click",function () {
            const type = $(this).data("type"); 
            if (type) { 
                createFormContainer(type);
                saveTypeToLocalStorage(type);
            }
        });
    }
    getEvenOnclickButton();


    // Get form type name
    function getFormTypeName(string) {
        if (string) { 
            return string.charAt(0).toUpperCase() + string.slice(1);
        } return ''; 
    }


    // Tạo form
    function createFormContainer(type) {
        formID++;

        const newFormContainer = $('<div class="form-container"></div>');
        let formContent = `
            <form data-id="${formID}" id="form-action">
                <div class="form-header"> 
                    <span class="form-name">${getFormTypeName(type)} Field</span>
                    <i class="icon x"></i>
                </div>`;

        // Form cho kiểu input
        if (type === "input") {
            formContent += `
                <div class="form-colum ">
                    <div class="form-row position-item">
                        <span class="label">Type</span>
                        <select class="data-option" id="data-option-${formID}">
                            <option data-value="text">Text</option>
                            <option data-value="int">Number</option>
                            <option data-value="date">Date</option>
                            <option data-value="time">Time</option>
                            <option data-value="datetime-local">datetime-local</option>
                        </select>
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
            $('html, body').animate({ scrollTop: $(document).height() }, 300);
            newFormContainer.addClass('show'); 
        });

        choiceDataTypeOP(formID)

        animationDragForm();
    }

    // Chọn kiểu dữ liệu
    function choiceDataTypeOP(formID) {
        $(`#data-option-${formID}`).on("change", function() {
            const selectedType = $(this).find(":selected").attr('data-value');
        
            $(`#placeholder-${formID}`).attr("type", selectedType);
            $(`#placeholder-${formID}`).off('input');
        
            if (selectedType === 'int') {
                $(`#placeholder-${formID}`).on('input', function() {
                    this.value = this.value.replace(/[^0-9]/g, '');
                });
            }
        });
    }
    

    // Validate data field
    function validateForm(form) {

        let isValid = true;

        
        const id = form.find('.input-id').val();
        const name = form.find('.input-name').val();
        const label = form.find('.input-label').val();
        const placeholder = form.find('.input-placeholder').val();
        

        // Ẩn tất cả các thông báo lỗi trước
        form.find('.error-data-option').hide();
        form.find('.error-id').hide();
        form.find('.error-name').hide();
        form.find('.error-label').hide();
        form.find('.error-placeholder').hide();
    

    
        if (id === undefined || id.trim() === "") {
            form.find('.error-id').text('ID không được để trống.').show();
            isValid = false;
        }
        else if (id.length < 6) {
            form.find('.error-id').text('ID phải có ít nhất 6 kí tự .').show();
            isValid = false;
        }
        else  {
            let IDs = [];
            let duplicateIndexes = []; 
            $('.form-container').each(function (index) {
                const idIput = $(this).find('.input-id').val();
                if (idIput) {
                    if (IDs.includes(idIput)) {
                        duplicateIndexes.push(index);
                        duplicateIndexes.push(IDs.indexOf(idIput)); 
                    } else {
                        IDs.push(idIput);
                    }
                }
            });
            
            duplicateIndexes = [...new Set(duplicateIndexes)];
            
            duplicateIndexes.forEach(index => {
                $('.form-container').eq(index).find('.error-id')
                .text('ID đã tồn tại, vui lòng nhập lại.').show();
                isValid = false;
            });

            duplicateIndexes = []
            
        }
    
        if (name === undefined || name.trim() === "") {
            form.find('.error-name').text('Name không được để trống.').show();
            isValid = false; 
        } else if(name.length < 5 ){
            form.find('.error-name').text('Name phải có ít nhất 5 kí tự.').show();
            isValid = false; 
        }
    
        if (label === undefined || label.trim() === "") {
            form.find('.error-label').text('Label không được để trống.').show();
            isValid = false;
        } else if(label.length < 5 ){
            form.find('.error-label').text('Lable phải có ít nhất 5 kí tự.').show();
            isValid = false;
        }
    
        if (form.find('.input-placeholder').length && 
            (placeholder === undefined || placeholder.trim() === "")) {
            form.find('.error-placeholder').text('Placeholder không được để trống.').show();
            isValid = false;
        }
    
        return isValid;
    }
    

    // Lưu dữ liệu vào Local Storage
    function saveDataFormToLocalStorage() {
        $('#save-create-form').on('click', function () {
            let existingData = JSON.parse(localStorage.getItem('formData')) || [];
    
            let id, name, label, require, placeholder, typeInput;
            let formData = {};
            let isAnyFormValid = true; 
    
            $('.form-container').each(function () {
                const form = $(this);
    
                if (!validateForm(form)) {
                    isAnyFormValid = false; 
                    return; 
                }
    
                id = form.find('.input-id').val();
                name = form.find('.input-name').val();
                label = form.find('.input-label').val();
                require = form.find('.input-require').is(':checked');
                placeholder = form.find('.input-placeholder').val();
                typeInput = form.find('.data-option').val();
    
                formData = {
                    formId: form.find("form").data('id'),
                    id: id,
                    name: name,
                    label: label,
                    typeInput: typeInput,
                    placeholder: placeholder,
                    require: require,
                    type: form.find('.form-name').text().replace(' Field', '').toLowerCase(),
                };
    
                const existingFormIndex = existingData.findIndex(
                    existingForm => existingForm.formId === formData.formId
                );
    
                if (existingFormIndex !== -1) {
                    const existingForm = existingData[existingFormIndex];
    
                    if (!formData.placeholder && existingForm.placeholder) {
                        formData.placeholder = existingForm.placeholder;
                    }
                    existingData[existingFormIndex] = formData;
                } else {
                    existingData.push(formData);
                }
            });
    
            if (isAnyFormValid) {
                localStorage.setItem('formData', JSON.stringify(existingData));
                alert("Lưu thành công");
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

            const placeholderInput = lastForm.find('.input-placeholder');
            placeholderInput.attr('type', formData.typeInput);
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


    // Xoa mot form duy nhat
    function deleteOneForm() {  
        $(".form").on('click', ".form-header .icon.x", function() {
            let formData = JSON.parse(localStorage.getItem('formData')) || [];

            const formContainer = $(this).closest(".form-container");
            const formId = formContainer.find("form").data('id'); 
            
            if (formData.some(item => item.formId === formId) || formId) {
                formContainer.remove(); 
        
                if (formData.some(item => item.formId === formId)) {
                    formData = formData.filter(item => item.formId !== formId); 
                    localStorage.setItem('formData', JSON.stringify(formData)); 
                }
                saveOrderToLocalStorage(); 
            } 
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