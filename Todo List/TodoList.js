
var arr = [];
EditedElementPos = -1;

if(localStorage.User_detail_array != undefined)
    arr = JSON.parse(localStorage.getItem('User_detail_array'));

window.onload = function(){
    Create_table();
}

edit_flag = 'false';

EmptyForm= (Data_elemenet)=>{
    edit_flag = 'false';
    Data_elemenet[0].value = '';
    Data_elemenet[1].value = '';
    Data_elemenet[2].value = '';
    Data_elemenet[3].value = '';
    Data_elemenet[4].value = '';
    Data_elemenet[5].value = '';
        
};
   
DeteleUserRecord = (id)=>{
    edit_flag = 'false';
    arr = JSON.parse(localStorage.getItem('User_detail_array'));
    arr.splice(id,1);

    var  string_data = JSON.stringify(arr);
    localStorage.setItem('User_detail_array',string_data);
    Create_table();
};

EditUserRecord = (id)=>{
    EditedElementPos = id;
    edit_flag = 'true';
    arr = JSON.parse(localStorage.getItem('User_detail_array'));
    var Data_elemenet = document.getElementById('User_detail_form');

    Data_elemenet[0].value = arr[id].Email;
    Data_elemenet[1].value = arr[id].Name;
    Data_elemenet[2].value = arr[id].User_Address;
    Data_elemenet[3].value = arr[id].User_City;
    Data_elemenet[4].value = arr[id].User_State;
    Data_elemenet[5].value = arr[id].User_Pin;


};

getTableCommonContent=(mode)=>{

    var str = "";
    str  += '<table class="table"><thead class="thead-dark"><tr>';
    str  += '<th scope="col">S.no</th><th scope="col">Email</th><th scope="col">Name</th>';
    str  += '<th scope="col">Address</th><th scope="col">City</th><th scope="col">State</th>';
    str  += '<th scope="col">Pin</th>';
    if(mode != 'print')
    str  += '<th scope="col"><img src ="gear.png" height = "30px"></img></th>';
    str  += '</tr></thead>';
    
    return str;

};

getTableUserContent= (mode)=>{
    var str = "<tbody>'";
    var AllUserDetails = JSON.parse(localStorage.getItem('User_detail_array'));

    for(var i=0;i<AllUserDetails.length;i++){
        // console.log(AllUserDetails[i].Email,AllUserDetails[i].Name,AllUserDetails[i].User_Address,AllUserDetails[i].User_City);

        str += '<tr>';
        str += `<th scope="row">${i+1}</th>`;
        str += `<th scope="row">${AllUserDetails[i].Email}</th>`;
        str += `<th scope="row">${AllUserDetails[i].Name}</th>`;
        str += `<th scope="row">${AllUserDetails[i].User_Address}</th>`;
        str += `<th scope="row">${AllUserDetails[i].User_City}</th>`;
        str += `<th scope="row">${AllUserDetails[i].User_State}</th>`;
        str += `<th scope="row">${AllUserDetails[i].User_Pin}</th>`;
        if(mode != 'print')
        {
            str  += `<th scope="col"><button  type="button" class="btn btn-primary" onclick="EditUserRecord(${i})">Edit</button><br><br>`;
            str  += `<button  type="button" class="btn btn-primary" onclick="DeteleUserRecord(${i})">Delete</button></th>`;
        }  
        str += '</tr>';
    }
    str += '</tbody></table>';
    return str;
};

Create_table= ()=>{



    var tableContent = "";
    tableContent += getTableCommonContent();
    tableContent += getTableUserContent();
    document.getElementById('UserDetailTable').innerHTML = tableContent;

};
process_form =()=>{
    console.log('process_form is called');
    flag = 'true'; 
    if(localStorage.User_detail_array != undefined)
        arr = JSON.parse(localStorage.getItem('User_detail_array'));


    var user_detail  = new Object();

    var data = document.getElementById('User_detail_form');
    
    for(var i = 0;i<6;i++){
        if( data[0].value == null ||  data[0].value == '' ||  data[0].value ==undefined)
        {
            alert('Kindly provide details for all the feilds');
            flag = 'false'
            break;
        }
    }
 if(flag == 'true')
 {
        user_detail.Email =        data[0].value;
        user_detail.Name =         data[1].value;
        user_detail.User_Address = data[2].value;
        user_detail.User_City =    data[3].value;
        user_detail.User_State =   data[4].value;
        user_detail.User_Pin =     data[5].value;
        console.log(user_detail);

        if(edit_flag == 'false')
            arr.push(user_detail);
        else{
            arr[EditedElementPos].Email =        data[0].value;
            arr[EditedElementPos].Name =         data[1].value;
            arr[EditedElementPos].User_Address = data[2].value;
            arr[EditedElementPos].User_City =    data[3].value;
            arr[EditedElementPos].User_State =   data[4].value;
            arr[EditedElementPos].User_Pin =     data[5].value;
            edit_flag = 'false';
            EditedElementPos = -1;
        }

        var  string_data = JSON.stringify(arr);
        localStorage.setItem('User_detail_array',string_data);

        Create_table();
    }
    EmptyForm(data);
};


function generateCustomHTML() {

    var tableContent = "";
    tableContent += '<html><head><title>'+'Todo List'+'</title>';
    tableContent += '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">';
    tableContent += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">';
    tableContent += '</head><body bgcolor=white>';

    tableContent += getTableCommonContent('print');
    tableContent += getTableUserContent('print');

    tableContent += '</body></html>';

    return tableContent;
  }

PrintForm = ()=>{
   
        var printWindow=window.open( "","PrintWindow","width=750,height=600,scrollbars=yes,resizable=yes");
        var printWindowDocument = printWindow.document;
    
        printWindowDocument.write('<html><head><title>'+'Todo List'+'</title>');
        printWindowDocument.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">');  
        printWindowDocument.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
        
        printWindowDocument.write('</head><body bgcolor=white>');
        printWindowDocument.write('<div id="_PrintWindowMessagesDiv" class="container"></div>');
        printWindowDocument.write('</body></html>');
        printWindowDocument.close();
        
        var msgDiv=printWindow.document.getElementById( '_PrintWindowMessagesDiv' );
        var printStatusMsg = printWindow.document.getElementById('printStatus');
        msgDiv.innerHTML=generateCustomHTML();

        
        printWindow.focus();
        printWindow.print();
        //printWindow.close();

};
