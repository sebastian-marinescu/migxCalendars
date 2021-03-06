   eventResize: function(event, revertFunc) {
        migxcalController.eventResize(event,revertFunc);
    },
    eventDrop: function(event, revertFunc,jsEvent, ui, view) {
        migxcalController.eventDrop(event,revertFunc,jsEvent, ui, view);
    },
    eventDragStart: function(event, jsEvent, ui, view) {
       migxcal_dragstart_day = event.start.dayOfYear();
       migxcal_dragstart_week = event.start.isoWeek();
    },    
    droppable: true,
    drop: function(moment, e ) {
        var el =  $(e.target);
        var event = {
            start : moment,
            data : el.data()
        }
        migxcalController.eventDropNew(event,el);   
    },
    eventAfterAllRender: function(view){
        migxcalController.hidePleaseWait();    
    },
    eventRender: function(event, element) {
        
        element.popover({
            content: event.popupmenu,
            html: true,
            placement: 'top'
        });
        
        element.on('show.bs.popover',function(){
            //hide all other popovers
            $('.popover').css({display:'none'}); 
            $('.fc-event').popover('hide');
        });
        element.on('shown.bs.popover',function(){
            $('.event-button').click(function() {
                var data = $(this).data();
                var action = data.action;
                if (action == 'edit'){
                    migxcalController.eventEdit(data);    
                }
                if (action == 'publish'){
                    migxcalController.eventPublish(data);    
                } 
                if (action == 'unpublish'){
                    migxcalController.eventPublish(data);     
                }
                if (action == 'loadcontainer'){
                    if (data.eventid){
                        migxcalController.loadDatesContainer(data.eventid);     
                    }
                }                                                     
                
            
            });              
        });        
    }   