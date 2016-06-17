// html结构中 <div id="container"></div>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>

// <script type="text/jsx"><script>
var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.title} {this.props.name}</div>;
    }
});
ReactDOM.render(
    <Hello name="World" title="Mr" />,
    document.getElementById('container')
);

// className
// style: .test-text{color: red; font-size: 12px;}

var Hello = React.createClass({
    render: function() {
        return <div className="test-text">Hello {this.props.name}</div>;
    }
});
ReactDOM.render(
    <Hello name="World" />,
    document.getElementById('container')
);

// style
var Hello = React.createClass({
    render: function() {
        return <div style={{color: 'red', fontSize: '12px', opacity: 1.0}}>Hello {this.props.name}</div>;
    }
});
ReactDOM.render(
    <Hello name="world"/>,
    document.getElementById('container')
);

// style2
var Hello = React.createClass({
    render: function() {
        var styleObj = {
            color: 'red',
            fontSize: '12px',
            opacity: 0.5
        };
        return <div style={styleObj}>Hello {this.props.name}</div>;
    }
});
ReactDOM.render(
    <Hello name="World" title="Mr" />,
    document.getElementById('container')
);


//生命周期: 1. Mounted: React Components 被render解析生成对应的DOM节点, 并被插入到浏览器的DOM结构
// hook函数: (getDefaultProps() -> getInitialState() ->) componentWillMount -> render ->componentDidMount

// 2. Update: setState() or setProps() -> render(): 一个Mounted的react components被重新render的过程
// hook函数: componentWillReceiveProps -> shouldComponentUpdate --true--> componentWillUpdate -> render -> componentDidUpdate

// 3. Unmounted: React.unmountAndReleaseReactRootNode(): 一个Mounted的react components对应的DOM节点被从DOM结构中移除的过程
// hook函数: componentWillUnmount

// example:
var Hello = React.createClass({

    getInitialState: function() {
        alert('init');
        return {
            opacity: 1.0,
          fontSize: '12px'
        };
    },
    render: function() {
        return <div style={{opacity: this.state.opacity, fontSize: this.state.fontSize}}>Hello {this.props.name}</div>;
        },
        componentWillMount: function() {
            alert('will');
        },
        componentDidMount: function() {
            alert('did');
            var _self = this;
            window.setTimeout(function() {
                _self.setState({
                opacity: 0.5,
                fontSize: '44px'
              });
            }, 1000);
    }
});

ReactDOM.render(
    <Hello name="World" />,
    document.getElementById('container')
);