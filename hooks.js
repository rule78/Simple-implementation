
// 通过闭包实现状态机制
var React = (function() {
    let _val, _deps
  
    return {
      useState(initialValue) {
        _val = _val || initialValue
  
        function setVal(value) {
          _val = value
        }
  
        return [_val, setVal]
      },
      useEffect(callback, deps) {
        const ifUpdate = !deps
  
        // 判断 Deps 中的依赖是否改变
        const ifDepsChange = _deps ? !_deps.every((r, index) => r === deps[index]) : true
  
        if (ifUpdate || ifDepsChange) {
          callback()
  
          _deps = deps || []
        }
      }
    }
  })();

var {useState, useEffect} = React;

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffect', count)
  }, [count])

  return {
    render: () => console.log('render', count),
    click: () => setCount(count + 1),
    noop: () => setCount(count), // 保持不变, 观察 useEffect 是否被调用
  }
}

Counter().render() // 'useEffect' 0, 'render', 0
Counter().noop()
Counter().render() // 'render', 0
Counter().click()
Counter().render() // 'useEffect' 1, 'render', 1