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

	RULE;

RULE = {
	P1: "活动是由共同目的联合起来并完成一定社会职能的动作的总和。活动由目的、动机和动作构成，具有完整的结构系统。苏联心理学家从20年代起就对活动进行了一系列研究。其中Α.Н.列昂节夫的活动理论对苏联心理学的发展影响很大，成为现代苏联心理学的重要理论基石。",
	P2: "活动和动作都是以实现预定目的为特征的，但是动作受单一目的的制约。而活动则受一种完整的目的和动机系统的制约。活动是由一系列动作构成的系统。",
	P3: "活动总要指向一定的对象。对象有两种:①制约着活动的客观事物；②调节活动的客观事物的心理映象。离开对象的活动是不存在的。活动总是由需要来推动的,人通过活动改变客体使其满足自身的需要。人对客观现实的积极反映、主体与客体的关系都是通过活动而实现的。在活动过程中主客体之间发生相互转化，通过活动客体转化为主观映象，而主观映象也是通过活动才转化为客观产物的。"
};

PageHeader = React.createClass({
	render: function () {
		return (
			<h1 className="header">签到送好礼</h1>
		);
	}
});

Calendar = React.createClass({
	initialCalendarUI: function () {
		var calendarPreset;
		calendarPreset = $(ReactDOM.findDOMNode(this.refs.datePicker));
		calendarPreset.datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          beforeShowDay: function (date) {
            var that,
                ifToday,
                ifSignedIn,
                day;
            that = $(this);
            ifToday = that.hasClass('ui-datepicker-today');
            return [true, 'signed-in', ''];
          }
        });
	},
	componentDidMount: function () {
		this.initialCalendarUI();
	},
	render: function () {
		return (
			<div id="datepicker" ref="datePicker"></div>
		);
	}
});

BtnSignIn = React.createClass({
	componentDidMount: function () {
		var cantSignIn, btnSignIn;
		btnSignIn = $(ReactDOM.findDOMNode(this.refs.btnSignIn));
		cantSignIn = $.cookie('cantSignIn');
		btnSignIn.on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			var that;
			that = $(this);
            if (!cantSignIn) {
              cantSignIn = false;
              $.cookie('cantSignIn', true, {
                expires: 1
              });
              that.addClass('did');
            }
		});
	},
	render: function () {
		return (
			<a href="#" className={!$.cookie('cantSignIn') ? "btn-sign" : "btn-sign did"} ref="btnSignIn">
				立即签到
			</a>
		);
	}
});

CalendarPanelCore = React.createClass({
	render: function () {
		return (
			<div className="core">
				<PageHeader/>
				<Calendar/>
				<BtnSignIn/>
			</div>
		);
	}
});

CalendarPanelDescription = React.createClass({
	render: function () {
		return (
			<div className="sign-describe">
			  <p>连续签到20天 送20元直减卷</p>
			</div>
		);
	}
});

Coupon = React.createClass({
	render: function () {
		return (
			<div className="coupon"></div>
		);
	}
});

CalendarPanel = React.createClass({
	render: function () {
		return (
			<section className="sign-ins-calander-panel">
				<CalendarPanelCore/>
				<CalendarPanelDescription/>
				<Coupon/>
			</section>
		);
	}
});

Rule = React.createClass({
	render: function () {
		return (
			<section className="rule">
				<h2 className="text-unselectable">—— 活动规则 ——</h2>
				<p className="text-unselectable">{RULE.P1}</p>
				<p className="text-unselectable">{RULE.P2}</p>
				<p className="text-unselectable">{RULE.P3}</p>
			</section>
		);
	}
});

Page = React.createClass({
	render: function () {
		return (
			<div>
				<CalendarPanel/>
				<Rule/>
			</div>
		);
	}
});

ReactDOM.render(
	<Page/>,
	document.getElementById('container'
)


























);