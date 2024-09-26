$(document).ready(function () {
    let formID = 0;


    // Chon kieu du lieu
    const choiceDataTypeOP = (formID) =>{

        $(`#data-type-${formID}`).click(function() {
            $(`#data-type-options-${formID}`).toggle();
        });

        // Cập nhật giá trị của ô input khi chọn một option, tra ra
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
        }
    });

    // Get form name
    function capitalizeFirstLetter(string) {
        if (string) { 
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return ''; 
    }


    //  Create  form
    function createFormContainer(type) {
        formID++;

        const newFormContainer = $('<div class="form-container"></div>');


        let formContent = `
            <form id="form-action">
                <span class="form-name">${capitalizeFirstLetter(type)} Field</span>
        `;

        if (type === "input"){
            formContent +=`
                <div class="form-row position-item">
                    <span class="label">Type</span>
                    <input class="data-option" id="data-option-${formID}"  type="text" readonly> <!-- Gán ID duy nhất -->
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

        if (type === "textarea"){
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

        if (type === "button"){
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
            `
        }
        formContent += `</form>`;

        // them form
        newFormContainer.html(formContent);
        $('.form').append(newFormContainer);


        // animation them form
        newFormContainer.slideDown(500, function() {
            $('html, body').animate({ scrollTop: newFormContainer.offset().top }, 1000);
            newFormContainer.addClass('show'); 
        });

        
        choiceDataTypeOP(formID);
        
        $(".form").sortable();
    }


    




     // Save data to Local Storage
    
    $('#save-create-form').click(function () {
        let existingData = JSON.parse(localStorage.getItem('formData')) || []; // Khởi tạo là mảng
    
        let formAdded = false;
    
        $('.form-container').each(function() {
            const id = $(this).find('.input-id').val();
            const name = $(this).find('.input-name').val();
            const label = $(this).find('.input-label').val();
            const require = $(this).find('.input-require').is(':checked');
            const placeholder = $(this).find('.input-placeholder').val();
            const typeInput = $(this).find('.data-option').val();
    
            // Kiểm tra các trường cần thiết
            if (id && name && label) {
                const formData = {
                    id: id,
                    name: name,
                    label: label,
                    typeInput: typeInput,
                    placeholder: placeholder,
                    require: require
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
            console.log('Dữ liệu đã lưu:', existingData); 
        } else {
            console.log('Không có dữ liệu mới để lưu.');
        }
    });
    

    function loadDataFromLocalStorage() {
        let existingData = JSON.parse(localStorage.getItem('formData')) || []; 

        existingData.forEach(formData => {
            createFormContainer(formData.typeInput); // Tạo form với kiểu dữ liệu đã lưu
            const lastForm = $('.form-container').last(); // Lấy form vừa tạo
            
            // Cập nhật các giá trị cho form
            lastForm.find('.input-id').val(formData.id);
            lastForm.find('.input-name').val(formData.name);
            lastForm.find('.input-label').val(formData.label);
            lastForm.find('.input-placeholder').val(formData.placeholder);
            lastForm.find('.input-require').prop('checked', formData.require);
            lastForm.find('.data-option').val(formData.typeInput); // Cập nhật kiểu dữ liệu
        });
    }

    
    
    $('#reset').click(function () {
        $('.form').html(''); 
        formID = 0;

        localStorage.removeItem('formData');
    });
});

