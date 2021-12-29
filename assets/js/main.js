    // Function Callings 
    loadData();

    let btnAction = "Insert";

$("#addNew").click(function(){
    // console.log("Clicked...")
    $("#studentModal").modal("show");
})

$("#studentForm").submit(function(e){
    e.preventDefault();
    
    // this variable have the form data
    let form_data = new FormData($("#studentForm")[0]);

    //adds the action to the form value
    if(btnAction == "Insert"){ 
        form_data.append("action", "registerStudent");
    }else{
        form_data.append("action", "updateStudent");
    }

    // Ajax aparameters -> Method, DataType, URL
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "api.php",
        data: form_data,
        processData: false,
        contentType: false,

        success: function(data){
            let status = data.status;
            let response = data.data;

            $("#studentForm")[0].reset(); 

            alert(response);
            btnAction="Insert";
            $("#studentModal").modal("hide");
            loadData();
        },
        error: function(data){
           console.log(response);
            
        },

    })
})

// Reading all data from the Database Using AJAX
function loadData(){

    $("#studentTable tbody").html("");

    let sendingData={
        "action":"readAll",
        "tbl": "student"
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url : "api.php",
        data: sendingData,
        success: function(data){
            let status = data.status;
            let response = data.data;

            let html='';
            let tr='';

            if(status){
                response.forEach(item=>{
                    tr +="<tr>";
                    for(let i in item){

                        tr+=`<td>${item[i]}</td>`;

                        // console.log(item[i]);
                    }
                    tr +=`<td> 
                            <a class="btn btn-success btn_update" update_id=${item['id']}><i class="far fa-edit"></i></a>
                            <a class="btn btn-danger btn_delete" delete_id=${item['id']}><i class="far fa-trash-alt"></i></a>
                     </td>`
                    tr +="</tr>";
                })
                $("#studentTable tbody").append(tr); 
            }
        },
        error: function(data){

        }
    })
}

function fetchInfo(id){

    let sendingData={
        "action":"readStudentInfo",
        "id": id,
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url : "api.php",
        data: sendingData,
        success: function(data){
            let status = data.status;
            let response = data.data;

            let html='';
            let tr='';

            if(status){
                // console.log(data);

                $("#studentName").val(response[0].name);
                $("#id").val(response[0].id);
                $("#studentClass").val(response[0].class);

                $("#studentModal").modal("show");
                btnAction = "Update";
            }
        },
        error: function(data){

        }
    })
}
function deleteStudent(id){

    let sendingData={
        "action":"deleteStudent",
        "id": id,
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url : "api.php",
        data: sendingData,
        success: function(data){
            let status = data.status;
            let response = data.data;

            let html='';
            let tr='';

            if(status){
                // console.log(data);

                alert(response[0]);
                loadData();
            }
        },
        error: function(data){

        }
    })
}

$("#studentTable").on("click", "a.btn_update", function(){
    let id = $(this).attr("update_id");
    fetchInfo(id);
})
$("#studentTable").on("click", "a.btn_delete", function(){
    let id = $(this).attr("delete_id");
    if(confirm("Do you want to Delete this Row?")){
        deleteStudent(id);
    }
})