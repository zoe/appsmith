// import { removeFalsyEntries } from "utils/helpers";

// export default function RenderChildren(props: any) {
//   const { children, count: numberOfItemsInGrid } = props;
//   if (children && children.length > 0) {
//     const childs = removeFalsyEntries(children);
//     const childCanvas = childs[0];
//     let canvasChildren = childCanvas.children;

//     try {
//       // here we are duplicating the template for each items in the data array
//       // first item of the canvasChildren acts as a template
//       const template = canvasChildren.slice(0, 1).shift();

//       for (let i = 0; i < numberOfItemsInGrid; i++) {
//         canvasChildren[i] = JSON.parse(JSON.stringify(template));
//         canvasChildren[i] = template;
//       }

//       // TODO(pawan): This is recalculated everytime for not much reason
//       // We should either use https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
//       // Or use memoization https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
//       // In particular useNewValues can be memoized, if others can't.
//       canvasChildren = this.updateGridChildrenProps(canvasChildren);

//       childCanvas.children = canvasChildren;
//     } catch (e) {
//       log.error(e);
//     }

//     return this.renderChild(childCanvas);
//   }
// }
