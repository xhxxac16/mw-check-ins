'use strict';

var PageHeader,
	Calendar,
	CalendarPanelCore,
	CalendarPanelDescription,
	CalendarPanel,
	BtnSignIn,
	Coupon,
	Rule,
	Page,

	reqUrl,
	postUrl,
	RULE;

reqUrl = 'date.json';
postUrl = 'date.json'

RULE = {
	P1: "活动是由共同目的联合起来并完成一定社会职能的动作的总和。活动由目的、动机和动作构成，具有完整的结构系统。苏联心理学家从20年代起就对活动进行了一系列研究。其中Α.Н.列昂节夫的活动理论对苏联心理学的发展影响很大，成为现代苏联心理学的重要理论基石。",
	P2: "活动和动作都是以实现预定目的为特征的，但是动作受单一目的的制约。而活动则受一种完整的目的和动机系统的制约。活动是由一系列动作构成的系统。",
	P3: "活动总要指向一定的对象。对象有两种:①制约着活动的客观事物；②调节活动的客观事物的心理映象。离开对象的活动是不存在的。活动总是由需要来推动的,人通过活动改变客体使其满足自身的需要。人对客观现实的积极反映、主体与客体的关系都是通过活动而实现的。在活动过程中主客体之间发生相互转化，通过活动客体转化为主观映象，而主观映象也是通过活动才转化为客观产物的。"
};

PageHeader = React.createClass({displayName: "PageHeader",
	render: function () {
		return (
			React.createElement("h1", {className: "header"}, "签到送好礼")
		);
	}
});

Calendar = React.createClass({displayName: "Calendar",
	loadSignDate:function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data) {
				this.setState({data: data});
				this.initialCalendarUI();
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	initialCalendarUI: function () {
		var calendarPreset, signList;
		calendarPreset = $(ReactDOM.findDOMNode(this.refs.datePicker));
		signList = this.state.data;
		var format = function (date, formatStr) {
			var str = formatStr;
			str=str.replace(/yyyy|YYYY/,date.getFullYear());
			str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));

			str=str.replace(/mm|MM/,(date.getMonth()+1>9?(date.getMonth()+1).toString():'0' + (date.getMonth()+1)));
			
			str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());
			str=str.replace(/d|D/g,date.getDate());
			return str;
		}
		calendarPreset.datepicker({
			dateFormat:"yy-mm-dd",
			// showOtherMonths: true,
			showOtherMonths: false,
			selectOtherMonths: true,
			// dayNamesMin:['Sun','Mo','Tues','Wed','Th','Fri','Sa'],
			beforeShowDay: function (date) {
				var that,
					// ifToday,
					// ifSignedIn,
					day;
					that = $(this);
				// ifToday = that.hasClass('ui-datepicker-today');
				for(var i in signList){  
					var signDate = signList[i].date;
					// alert(signDate+'--'+format(date,'yyyy-mm-dd'));
					if(signDate == format(date,'yyyy-mm-dd')){  
						return [true, 'signed-in', ''];  
						break;  
					}
				}
				return [false, '', ''];
			}
        });
	},
	componentDidMount: function () {
		this.loadSignDate();
	},
	render: function () {
		return (
			React.createElement("div", {id: "datepicker", ref: "datePicker"})
		);
	}
});

BtnSignIn = React.createClass({displayName: "BtnSignIn",
	postSignDate:function(){
		$.ajax({
			url: this.props.url,
			method:'POST',
			dataType: 'json',
			success: function(data) {
				this.setState({data: data});
				$('.ui-datepicker-today').addClass('signed-in');
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {cantSignIn: false};
	},
	componentDidMount: function () {
		var cantSignIn, btnSignIn, _this;
		btnSignIn = $(ReactDOM.findDOMNode(this.refs.btnSignIn));
		cantSignIn = $.cookie('cantSignIn');
		_this = this;
		if(cantSignIn){
            _this.setState({cantSignIn: cantSignIn});
            return false;
        }
		btnSignIn.on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			var that,date,diffTime;
            that = $(this),
            date = new Date();
            diffTime = (23-date.getHours())*60*60*1000 + (59-date.getMinutes())*60*1000+(60-date.getSeconds())*1000;
            date.setTime(date.getTime()+diffTime);
            
            if (!cantSignIn) {
              cantSignIn = false;
              $.cookie('cantSignIn', true, {
                expires: date
              });
              that.addClass('did');
              _this.setState({
              	cantSignIn: cantSignIn
              });
              _this.postSignDate();
              $('.ui-datepicker-today').addClass('signed-in');
            }
            return false;
		});
	},
	render: function () {
		var text = !this.state.cantSignIn ? '立即签到' : '已签到',
			classname = !this.state.cantSignIn ? 'btn-sign' : 'btn-sign did';
		return (
			React.createElement("a", {href: "javascript:;", className: classname, ref: "btnSignIn"}, 
				text
			)
		);
	}
});

CalendarPanelCore = React.createClass({displayName: "CalendarPanelCore",
	render: function () {
		return (
			React.createElement("div", {className: "core"}, 
				React.createElement(PageHeader, null), 
				React.createElement(Calendar, {url: reqUrl}), 
				React.createElement(BtnSignIn, {url: reqUrl})
			)
		);
	}
});

CalendarPanelDescription = React.createClass({displayName: "CalendarPanelDescription",
	render: function () {
		return (
			React.createElement("div", {className: "sign-describe"}, 
			  React.createElement("p", null, "连续签到20天 送20元直减卷")
			)
		);
	}
});

Coupon = React.createClass({displayName: "Coupon",
	render: function () {
		return (
			React.createElement("div", {className: "coupon"})
		);
	}
});

CalendarPanel = React.createClass({displayName: "CalendarPanel",
	render: function () {
		return (
			React.createElement("section", {className: "sign-ins-calander-panel"}, 
				React.createElement(CalendarPanelCore, null), 
				React.createElement(CalendarPanelDescription, null), 
				React.createElement(Coupon, null)
			)
		);
	}
});

Rule = React.createClass({displayName: "Rule",
	render: function () {
		return (
			React.createElement("section", {className: "rule"}, 
				React.createElement("h2", {className: "text-unselectable"}, "—— 活动规则 ——"), 
				React.createElement("p", {className: "text-unselectable"}, RULE.P1), 
				React.createElement("p", {className: "text-unselectable"}, RULE.P2), 
				React.createElement("p", {className: "text-unselectable"}, RULE.P3)
			)
		);
	}
});

Page = React.createClass({displayName: "Page",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement(CalendarPanel, null), 
				React.createElement(Rule, null)
			)
		);
	}
});

ReactDOM.render(
	React.createElement(Page, null),
	document.getElementById('container')
);









