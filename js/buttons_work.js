$(function(){
    $('.btn-circle').on('click',function(){
        console.log("QUIIIIII");
        $('.btn-circle.btn-my').removeClass('btn-my').addClass('btn-default');
        $(this).addClass('btn-my').removeClass('btn-default').blur();
    });

    $('.next-step, .prev-step').on('click', function (e){
        var $activeTab = $('.tab-pane.active');

        $('.btn-circle.btn-my').removeClass('btn-my').addClass('btn-default');

        if ( $(e.target).hasClass('next-step') )
        {
            var nextTab = $activeTab.next('.tab-pane').attr('id');
            $('[href="#'+ nextTab +'"]').addClass('btn-my').removeClass('btn-default');
            $('[href="#'+ nextTab +'"]').tab('show');
        }
        else
        {
            var prevTab = $activeTab.prev('.tab-pane').attr('id');
            $('[href="#'+ prevTab +'"]').addClass('btn-my').removeClass('btn-default');
            $('[href="#'+ prevTab +'"]').tab('show');
        }
    });
});