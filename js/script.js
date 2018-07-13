var app={
    isEmpty:false,
    json:{
        "name":[],
        "code":[],
        "price":[],
        "gst":[]
    },
    inc: 1,
    total_amount: 0,
    list:[],
    
    init: function(){
        if(this.checkJson()){
            this.fetchData();
        }
        this.KeyDown();
        this.onSubmit();
    },
    
    KeyDown: function(){
        
        $('#prod_gst').on('keydown',function(e){
            app.preventAlpha(e);
        });
        
        $('#prod_price').on('keydown',function(e){
            app.preventAlpha(e);
        });
        
        $('#quant').on('keydown',function(e){
            app.preventAlpha(e);
        });
        
        $('.inputBox').on('keydown',function(){
            if(app.isEmpty){
                $(this).removeAttr('style');
            }
        });
        
        $('.inputBox1').on('keydown',function(e){
            $('.error').remove();
            if(e.keyCode == 13){
                if($(this).val()!=""){
                    var prod_data= JSON.parse(localStorage.getItem('GroceryProducts'));
for (var i in prod_data) {
    var iName = prod_data["name"].indexOf($(this).val());
    var iCode = prod_data["code"].indexOf($(this).val());
   if(iName != -1){
       if(app.list.indexOf(iName) != -1){
           $('#searchBox').append('<span class="error">Product already in List</span>');
       }
       else{
        app.list.push(iName);
        $('.billingForm table').append('<tr class="prodItem" id="row'+app.inc+'"><td>'+app.inc+'</td><td id="prod_name">'+prod_data["name"][iName]+'</td><td>'+prod_data["code"][iName]+'</td><td id="quantity"><span class="decrease" onclick="app.decrease(this)">-</span><input type="text" id="quant" value="1" disabled/><span class="increase" onclick="app.increase(this)">+</span></td><td id="prod_price">'+prod_data["price"][iName]+'<span class="gstInc">+ <span id="gst">'+prod_data["gst"][iName]+'</span>% GST</span></td></tr>');
       app.calculate(prod_data,iName);
       app.inc++;
            $('.billingForm .box').show();
           app.resetFun();
       break; 
       
   }  }
    else if(iCode != -1){
        if(app.list.indexOf(iCode) != -1){
           $('#searchBox').append('<span class="error">Product already in List</span>');
       }
       else{
        $('.billingForm table').append('<tr class="prodItem" id="row'+app.inc+'"><td>'+app.inc+'</td><td id="prod_name">'+prod_data["name"][iCode]+'</td><td>'+prod_data["code"][iCode]+'</td><td id="quantity"><span class="decrease" onclick="app.decrease(this)">-</span><input type="text" id="quant" value="1" disabled/><span class="increase" onclick="app.increase(this)">+</span></td><td id="prod_price">'+prod_data["price"][iCode]+'<span class="gstInc">+ <span id="gst">'+prod_data["gst"][iCode]+'</span>% GST</span></td></tr>');
        app.calculate(prod_data,iCode);
        app.inc++;
        $('.billingForm .box').show();
        app.resetFun();
        break;
       }
    }
    else
        $('#searchBox').append('<span class="error">Product not found</span>');
}
                }
                else{
                    $('#searchBox').append('<span class="error"> Enter enter product name or product code...</span>');
                    
                }
            }
        });
        
    },
    
    
    preventAlpha: function(e){
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || $.inArray(e.which, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.which == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) || (e.which == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) || (e.which == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39) || (e.which >= 35 && e.which <= 39)) {
                 return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) || (e.shiftKey || (e.which < 48 || e.which > 57)) && (e.which < 96 || e.which > 105)) {
            e.preventDefault();
            }
    },
    
    
    calculate: function(prod_data,index){
        $('.total').remove();
        var total_price = parseFloat(prod_data["price"][index]);
        var gst = parseFloat(prod_data["gst"][index]);
        app.total_amount += (total_price + (total_price * (gst / 100)));
        $('.billingForm table').append('<tr class="total"><td colspan="4">Gross Amount</td><td>'+app.total_amount.toFixed(2)+'</td></tr>');
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
           if(!app.isEmpty){   
               if(app.json.name.indexOf($("#prod_name").val()) != -1){
                   alert('Same name already exist');
               }
               else if(app.json.code.indexOf($("#prod_code").val()) != -1){
                   alert('Same code already exist');
               }
               
               else{
                app.json.name.push($("#prod_name").val());
                app.json.code.push($("#prod_code").val());
                app.json.price.push($("#prod_price").val());
                app.json.gst.push($("#prod_gst").val());
                app.updateData();
                app.resetFun();
                   alert('new product added');
               }
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
        $('.inputBox,.inputBox1').val('');
    },
    
    Switch: function(){
        if($('.entryForm').hasClass('disabled')){
            if($('.allProd').hasClass('disabled')){
                $('.billingForm').addClass("disabled").slideUp();
                $('.entryForm').removeClass("disabled").slideDown();
            }
            else{
                $('.disButton').text('Show Products');
                $('.disButton').toggleClass('prodDis');
                $('.billingForm').removeClass("disabled").slideDown();
                $('.allProd').addClass("disabled").slideUp();
            }
        }
        else{
            $('.billingForm').removeClass("disabled").slideDown();
            $('.entryForm').addClass("disabled").slideUp();
        }
//        
//        $('.entryForm').slideToggle('slow');
//        $('.billingForm').slideToggle('slow');
//        $('.allProd').slideUp('slow');
//        $('body').toggleClass('active');
    },
    
    increase: function(e){
        var quantity = parseInt($(e).siblings("#quant").val());
        
$(e).siblings("#quant").val(quantity+1);
        app.updateAmount();
    },
    
    decrease: function(e){
        var quantity = parseInt($(e).siblings("#quant").val());
        if(quantity > 1){
            $(e).siblings("#quant").val(quantity-1);
            $(e).html("-");
        }
        else{
            var prod_data= JSON.parse(localStorage.getItem('GroceryProducts'));
            for (var i in prod_data) {
                var iName = prod_data["name"].indexOf($(e).closest('tr').children('#prod_name').text());
                if(app.list.indexOf(iName) != -1){
                    app.list.splice(app.list.indexOf(iName),1);
                }
            }
            $(e).closest('tr').remove();
            app.inc--;
            if(app.inc==1){
                $('.billingForm .box').hide();
            }
        }
        app.updateAmount();
    },
    
    
    updateAmount: function(){
        app.total_amount = 0;
        for(var i=1;i<app.inc;i++){
            var price = parseInt($('#row'+i+' #prod_price').text());
            var quantity = parseInt($('#row'+i+' #quant').val());
            var finalPrice = price * quantity;
        var gst = parseFloat($('#row'+i+' #gst').text());
        app.total_amount += (finalPrice + (finalPrice * (gst / 100)));
        }
        $('.total').remove();
        $('table').append('<tr class="total"><td colspan="4">Gross Amount</td><td>'+app.total_amount.toFixed(2)+'</td></tr>');
    },
    
    showProd: function(){
        $('.disButton').toggleClass('prodDis');
        $('.noItem').remove();
        
        if ($('.entryForm').hasClass('disabled')) {
            $('.billingForm').addClass('disabled').slideUp();
            app.what = '.entryForm';
        } else {
            $('.entryForm').addClass('disabled').slideUp();
            app.what = '.billingForm';
        }
        
        if($('.allProd').hasClass('disabled')){
           $('.allProd').removeClass('disabled').slideDown();
            $('.disButton').text('Hide Products');
        }else{
            $('.allProd').addClass('disabled').slideUp();
            $('.disButton').text('Show Products');
            $(app.what).removeClass('disabled').slideDown();
        }
        
        
        var prod_data= JSON.parse(localStorage.getItem('GroceryProducts'));
        var k = 1;
        if(prod_data == null){
             $('.disProd').append('<tr class="noItem" ><td colspan="5">No product found. Please Enter a product.</td></tr>');
        }
        else
            for (var j in prod_data["name"]) {
                $('#row'+k).remove();
                $('.disProd').append('<tr class="prodItem" id="row'+k+'"><td>'+k+'</td><td id="prod_name">'+prod_data["name"][k-1]+'</td><td>'+prod_data["code"][k-1]+'</td><td id="prod_price">'+prod_data["price"][k-1]+'</td><td>'+prod_data["gst"][k-1]+'</span>%</span></td></tr>');
                k++;
//                continue;
            
    }
    
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