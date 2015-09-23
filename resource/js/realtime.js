/**
 * realtimeIssue
 * on jQuery
 * http://nejan.com
 *
 * Copyright 2015, Choi Sunki (iru@nate.com)
 */
;(function($){

    /**
     * [realtimeIssue description]
     * @param  {[type]} opts [option 지정]
     * @return {[type]}      [rolling functions]
     */
    $.fn.realtimeIssue = function(opts){

        var defaults = {
            cycleTime   : 700   // 롤링 주기
            ,duration   : 500   // 롤링 속도
            ,listItem   : 'li'  // 롤랑 목록
            ,listHeight : 48    // 롤링 목록 높이
            ,startIdx   : 0     // 롤링 시작 위치
            ,hoverStop  : true  // 호버링시 롤링 멈춤
        }
        ,options = $.extend(opts, defaults);

        this.each(function(){

            var $element        = $(this)
                ,$rollingList   = $element.find( options.listItem )
                ,count          = options.startIdx
                ,timer
                ,rolling;                

            /**
             * [rolling description]
             * @return {[type]} [description]
             */
            rolling = function() {
                return timer = setInterval(function(){
                    $rollingList.eq( count ).find('.item').stop().animate({
                        'top' : -options.listHeight
                    }, options.duration, function(){
                        $rollingList.eq( count - 1 ).find('.item').css({
                            'top' : 0
                        })
                    })

                    count++;
                    if( $rollingList.length == count ) {

                        count = options.startIdx;
                    } 

                }, options.cycleTime)
            };

            rolling();

            if(options.hoverStop === true) {
                $rollingList.on('mouseenter mouseleave', function(event){
                    if(event.type === 'mouseenter') {

                        clearInterval(timer);
                    } else {

                        rolling();
                    }
                })
            }

        })
    }
})(jQuery);