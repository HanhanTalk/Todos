var i = 0;
var text='';
var arr = [];
$(function(){
  $("#newtodo").on('keypress',function(event){
    if(event.keyCode=="13"){
      i=i+1;
      text = $(event.target).val();
      todosAdd(i);
      todosArray(i,text);
      updateTodosCouts();
      isHasCpt();
      toggleAll();
    }
  })
  todosDel();
  todosDown();
  AllToDos();
  editToDos();
  toggleAll();
  // eachArray();
});
function todosAdd(id){
  var newtodoVul= $('#newtodo').val();
  $("#newtodo").val('');
  var tpl_html=$('.todo-li-template').clone(true);
  tpl_html.find('.todo-name').text(newtodoVul);
  tpl_html.removeClass('hidden');
  tpl_html.removeClass('todo-li-template');

  // tpl_html.data('id', id);
  tpl_html.attr('data-id', String(id));

  $('#list').prepend(tpl_html);
}
function todosDel(){
  $(".destroy").on('click',function(event){
    $(this).addClass("btn-click");
    setTimeout(function() {
      $(event.target).parents('.todo').remove();
      delToDos(Number($(event.target).parents('.todo').data('id')));
    }, 200);
  });
}
function todosDown(){
  $(".toggle").on('click',function(event) {
    if($(event.target).is(":checked")) {
      todosToDonw(Number($(event.target).parents('.todo').data('id')));
      $(event.target).siblings('.todo-name').addClass("line");
    } else {
      donwToDos(Number($(event.target).parents('.todo').data('id')));
      $(event.target).siblings('.todo-name').removeClass("line");
    }
    toggleAll();
    isHasCpt();
    isHasAct();

  })
  $(".toggle-all").on('click',function() {
    if($(".toggle-all").is(":checked")) {
      $("#list .toggle").prop("checked", true);
      $("#list .todo-name").addClass("line");
    }
    else{
      $("#list .toggle").prop("checked", false);
      $("#list .todo-name").removeClass("line");
    }
    isHasCpt();
    isHasAct();
  })
}

function todosArray(id,text){
  arr.push({
    id: id,
    status: 'todo',
    text:text
  });
}
function updateTodosCouts(){
  var num=0;
  arr.forEach(function(item){
    if(item.status=='todo'){
      num++;
    }
  })
  $("#foot-num").text(num);
}

// 在arr里找到id为传入参数id的项,把它的status改为done
function todosToDonw(id) {
  arr.forEach(function (item) {
    if(item.id==id){
      item.status='done';
    }
  });
  updateTodosCouts(id);
}
function donwToDos(id){
  arr.forEach(function (item) {
    if(item.id==id){
      item.status='todo';
    }
  });
  updateTodosCouts(id);
}
function delToDos(id){
  arr.forEach(function (item,index){
    if(item.id == id){
      arr.splice(index,1);
    }
  });
  updateTodosCouts(id);
}
function AllToDos(){
  $("#all").on("click",function(){
    $("#list li").show();
    $(".footbtn li").removeClass("box");
    $("#all").parent().addClass("box");
  })
}

$("#act").on("click",function(){
   ActiveToDos();
  $(".footbtn li").removeClass("box");
  $("#act").parent().addClass("box");
 });
function ActiveToDos() {
   $("#list li").each(function(index,element){
     if($(element).find(".todo-name").hasClass("line")){
       $(element).hide();
     }else{
       $(element).show();
     }
   })
}

$("#cpt").on("click",function(){
    CptToDos();
    $(".footbtn li").removeClass("box");
    $("#cpt").parent().addClass("box");

});

function CptToDos(){
    $("#list li").each(function(index,element){
      if($(element).find(".todo-name").hasClass("line")){
        $(element).show();
      }else{
        $(element).hide();
      }
    })

  };
function isHasCpt(){
  $(".footbtn li").each(function(){
    if($(".footbtn").find(".box").find("a").attr("id")=="cpt"){
        CptToDos();
      }
  })
};
function isHasAct(){
  $(".footbtn li").each(function(){
    if($(".footbtn").find(".box").find("a").attr("id")=="act"){
      ActiveToDos();
    }
  })
}
function toggleAll(){
  $("#list li").each(function(){
    if($("#list li").find(".toggle:checked").length==$("#list li").length){
      $(".toggle-all").prop("checked",true);
    }
    if($("#list li").find(".toggle:checked").length===0){
      $(".toggle-all").prop("checked",false);
    }
  })
}
function editToDos() {
  $("#list").dblclick(function (event) {
    if ($(event.target).hasClass('todo-name')) {
      var $newtodos = $(event.target).parents('.todo').find(".newtodos");
      var resettodos = $(event.target).text();
      $newtodos.removeClass("hidden");
      $newtodos.val(resettodos);
      $(event.target).siblings(".todo-icon").addClass("hidden");

    }
  })
}
function alterTodo(event){
    if (event.keyCode == "13") {
      $(event.target).siblings(".view").find(".todo-icon").removeClass("hidden");
      $(event.target).parents(".todo").find(".todo-name").text($(event.target).val());
      $(event.target).addClass("hidden");
    }
  }