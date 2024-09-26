$(document).ready(function () {
    let formID = 0;


    // Tải dữ liệu từ Local Storage khi trang được truy cập
    // loadFormsFromLocalStorage();

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
                    <input class="data-option" id="data-option-${formID}" type="text" readonly> <!-- Gán ID duy nhất -->
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
            $('html, body').animate({
                scrollTop: newFormContainer.offset().top
            }, 1000);
            newFormContainer.addClass('show'); 
        });
        
        choiceDataTypeOP(formID);
        
        $(".form").sortable();
    }


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


     // Save data to Local Storage
    $('#save-create-form').click(function () {
        const allFormsData = [];

        $('.form-container').each(function() {
            const formData = {
                id: $(this).find('.input-id').val(),
                name: $(this).find('.input-name').val(),
                label: $(this).find('.input-label').val(),
                placeholder: $(this).find('.input-placeholder').val(),
                require: $(this).find('.input-require').is(':checked'),
                type: $(this).find('.data-option').val()
            };
            allFormsData.push(formData);
        });

        console.log(allFormsData);

        // Save to Local Storage
        localStorage.setItem('formData', JSON.stringify(allFormsData));
        alert('Dữ liệu đã được lưu vào Local Storage!');
    });



    // Tải dữ liệu từ Local Storage
    // function loadFormsFromLocalStorage() {
    //     const storedData = localStorage.getItem('formData');
    //     if (storedData) {
    //         const allFormsData = JSON.parse(storedData);
    //         allFormsData.forEach(data => {
    //             createFormContainer(data.type); // Tạo form mới với loại tương ứng
    //             const lastForm = $('.form-container').last(); // Lấy form vừa tạo
    //             // Điền dữ liệu vào form tương ứng
    //             lastForm.find('.input-id').val(data.id);
    //             lastForm.find('.input-name').val(data.name);
    //             lastForm.find('.input-label').val(data.label);
    //             lastForm.find('.input-placeholder').val(data.placeholder);
    //             lastForm.find('.input-require').prop('checked', data.require);
    //             lastForm.find('.data-option').val(data.type); // Đảm bảo chọn đúng kiểu dữ liệu
    //         });
    //     }
    // }



    // Reset form
    $('#reset').click(function () {
        $('.form').html(''); 
        formID = 0;

        localStorage.removeItem('formData');
    });
});

