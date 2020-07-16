    $(document).ready(function(){
        



        var TODOS_LSText = 'toDosText';
        let toDosText = [];



        var reply_count = 0; 
        var status = false; 
         
        $("#list").click(function(){
            alert("게시판 리스트로 이동");
            //location.href = "/board/list";
        });
         
        //댓글 저장
        $("#reply_save").click(function(){
             
            //널 검사
            if($("#reply_writer").val().trim() == ""){
                alert("이름을 입력하세요.");
                $("#reply_writer").focus();
                return false;
            }
             
            if($("#reply_password").val().trim() == ""){
                alert("패스워드를 입력하세요.");
                $("#reply_password").focus();
                return false;
            }
             
            if($("#reply_content").val().trim() == ""){
                alert("내용을 입력하세요.");
                $("#reply_content").focus();
                return false;
            }
             
            var reply_content = $("#reply_content").val().replace("\n", "<br>"); //개행처리
           
            //값 셋팅
            var objParams = {
                    board_id        : $("#board_id").val(),
                    reply_writer    : $("#reply_writer").val(),
                    reply_password  : $("#reply_password").val(),
                    reply_content   : reply_content
            };
            toDosText.push(objParams);
            localStorage.setItem(TODOS_LSText,JSON.stringify(toDosText));
            
            
            
            var reply_id;
          
            
            
            var reply_area = $("#reply_area");
             
            var reply = 
                '<tr reply_type="main">'+
                '   <td width="820px">'+
                reply_content+
                '   </td>'+
                '   <td width="100px">'+
                $("#reply_writer").val()+
                '   </td>'+
                '   <td width="20px">'+
                '       <input type="password" id="reply_password_'+reply_id+'" style="width:100px;" maxlength="10" placeholder="비밀번호"/>'+
                '   </td>'+
                '   <td align="center" width="20px" >'+
                '       <button name="reply_del" reply_id = "'+reply_id+'">삭제</button>      '+
                '   </td>'+
                '</tr>';
                 
             if($('#reply_area').contents().size()==0){
                 $('#reply_area').append(reply);
             }else{
                 $('#reply_area tr:last').after(reply);
             }

            
            $("#reply_writer").val("");
            $("#reply_password").val("");
            $("#reply_content").val("");
             
        });
         
        //댓글 삭제
        $(document).on("click","button[name='reply_del']", function(){
             
            var check = false;
            var reply_id = $(this).attr("reply_id");
            var reply_password = "reply_password_"+reply_id;
            
            if($("#"+reply_password).val().trim() == ""){
                alert("패스워드을 입력하세요.");
                $("#"+reply_password).focus();
                return false;
            }
             
            //패스워드와 아이디를 넘겨 삭제를 한다.
            //값 셋팅
            var objParams = {
                    reply_password  : $("#"+reply_password).val(),
                    reply_id        : reply_id
            };
            
            check = true;//삭제 되면 체크값을 true로 변경
             
            if(check){
                //삭제하면서 하위 댓글도 삭제
                var prevTr = $(this).parent().parent().next(); //댓글의 다음
                 
                while(prevTr.attr("reply_type")=="sub"){//댓글의 다음이 sub면 계속 넘어감
                    prevTr = prevTr.next();
                    prevTr.prev().remove();
                }
                 
                 
                $(this).parent().parent().remove(); 
            }
             
        });   

    });
