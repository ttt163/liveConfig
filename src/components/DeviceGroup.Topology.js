import React, {
    Component,
    PropTypes
    } from 'react'
import { connect } from 'react-redux'
//import { selectTopo} from '../actions/actions'
import ReactDOM  from 'react-dom'
import Ipcomp from "./Topology.ipcomp.js"
import Province from "./Topology.Province.js"
import TopoConfig from "./Topology.config.js"
import TopoContent from "./Topology.content.js"
import TopoNav from "./Topology.nav.js"
class Topology extends Component {
  constructor(state) {
    super(state);
  }
 /* componentDidMount(){
    console.log("拓扑开始")

  }

    componentWillUnmount() {
         console.log("j结束");
    }*/
  componentWillReceiveProps(nextProps){
  }
  render() {
    const { dispatch,topoItems} = this.props;
    return (
        <div className="topology">
          <div className="topo-left">
            {topoItems.topoItems.length?
                topoItems.topoItems.map((item, index) => <TopoNav {...item} index={index} key={index} />
                )
                :""
            }
          </div>
          <div ref="main" className="topo-main">
            {topoItems.topoItems.length?
                topoItems.topoItems.map((item, index) =><TopoContent index={index} {...item} key={index} />
                )
                :""
            }
          </div>
        </div>
    )
  }
}
function sel(state) {
    //console.log(state);
  return {topoItems:state.topos}
}
export default connect(sel)(Topology)