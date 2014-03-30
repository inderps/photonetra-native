var CalendarCtrl = can.Control.extend({
    init: function( element, options ) {
        $(".title").html("<span class='icon-camera'></span> Shoots");
        $("#back").hide();

        var calendarView = can.view("#calendar-view");
        this.element.html(calendarView);

        var $calendar = $( '#calendar' ),
            cal = $calendar.calendario( {
                onDayClick : function( $el, $contentEl, dateProperties ) {
                    console.log("hello");
                },
                displayWeekAbbr : true
            } ),
            $month = $( '#custom-month' ).html( cal.getMonthName() ),
            $year = $( '#custom-year' ).html( cal.getYear() );

        $( '#custom-next' ).on( 'click', function() {
            cal.gotoNextMonth( updateMonthYear );
        } );

        $( '#custom-prev' ).on( 'click', function() {
            cal.gotoPreviousMonth( updateMonthYear );
        } );

        function updateMonthYear() {
            $month.html( cal.getMonthName() );
            $year.html( cal.getYear() );
        }

        Loader.stop();
    }
});