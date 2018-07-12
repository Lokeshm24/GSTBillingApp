var app={
    isEmpty:false,
    json:{
        "prod_data":[]
    },
    
    init: function(){
        if(this.checkJson()){
            this.fetchData();
        }
        this.KeyDown();
        this.onSubmit();
    },
    
    KeyDown: function(){
        $('#prod_gst,#prod_price').on('keydown',function(e){
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
        });
        
        $('.inputBox').on('keydown',function(){
            if(app.isEmpty){
                $(this).removeAttr('style');
            }
        });
    },
    
    onSubmit: function(){
        $('.submitButton').on('click',function(){
            $.each($('.inputBox'),function(k,v){
                if($(this).val() == ""){
                    $(this).css({"border-color":"#ff0000aa","-moz-box-shadow":    "inset 0 0 10px #ff0000aa",
   "-webkit-box-shadow": "inset 0 0 10px #ff0000aa",
   "box-shadow":         "inset 0 0 10px #ff0000aa"});
                app.isEmpty=true;
                }
                else {          
                    app.isEmpty=false;
                }
            });
           if(!app.isEmpty){                       app.json.prod_data.push({"name":$("#prod_name").val(),"code":$("#prod_code").val(),"price":$("#prod_price").val(),"gst":$("#prod_gst").val()});
                      app.updateData();
                        app.resetFun();
            }
        });
    },
    
    checkJson: function(){
        if(localStorage.getItem('GroceryProducts') === null){
            return false;
        }
        return true;
    },
    
    updateData: function(){
        localStorage.setItem('GroceryProducts', JSON.stringify(app.json));
    },
    
    fetchData: function(){ 
        app.json = JSON.parse(localStorage.getItem('GroceryProducts'));
    },
    
    resetFun:function(){
        $('.inputBox').val('');
    }
}

$(window).on('load', function(){
    app.init();
});

$(document).ready(function(){
    $(".btn").click(function (e) {
        $(".ripple").remove();
        var posX = $(this).offset().left,
        posY = $(this).offset().top,
        buttonWidth = $(this).width(),
        buttonHeight =  $(this).height();

        $(this).prepend("<span class='ripple'></span>");
        if(buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight; 
        }
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;
        
        $(".ripple").css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + 'px',
        left: x + 'px'}).addClass("rippleEffect");
    });
});