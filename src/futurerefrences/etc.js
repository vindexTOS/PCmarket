// type FilterState = {
//     CPU?: string
//     RAM?: string
//     SSD?: string
//     ROM?: string
//     DDR?: string
//     GPU?: string
//     MB?: string
//     PSU?: string
//     // setPCData?: (productData: any[]) => void
//   }

// switch (action.type) {
//     case 'CPU':
//       return {
//         CPU: state.CPU = action.payload,
//         setPCData: (productData: any[]) =>
//           setPCData(
//             productData?.filter(
//               (val: { aditionalObj: { chip: string }; category: string }) => {
//                 if (
//                   val.category == 'Pre built' ||
//                   val.category == 'Used Pc'
//                 ) {
//                   if (val.aditionalObj.chip !== undefined) {
//                     if (val.aditionalObj.chip.includes(state.CPU ?? '')) {
//                       return val
//                     }
//                   }
//                 }
//               },
//             ),
//           ),
//       }

// useEffect(() => {
//     let newVal = productData?.filter(
//       (val: { aditionalObj: { chip: string }; category: string }) => {
//         if (val.category == 'Pre built' || val.category == 'Used Pc') {
//           if (val.aditionalObj.chip !== undefined) {
//             if (val.aditionalObj.chip.includes(filterState?.CPU ?? '')) {
//               return val
//             }
//           }
//         }
//       },
//     )
//     setPCData(newVal)
//     console.log(newVal)
//   }, [filterState])

// <Route path="/desktop" element={<PC />}>
// <Route path="used-pc" element={<UsedPc />} />
// <Route path="new-pc" element={<NewPc />} />
// </Route>
// {/* laptop category and sub categorys */}
// <Route path="/laptop" element={<LAPTOP />}>
// <Route path="used-laptop" element={<UsedLaptop />} />
// <Route path="new-laptop" element={<NewLaptop />} />
// </Route>
// {/* compnent category and sub categorys */}
// <Route path="/components" element={<COMPONENTS />} />
// {/* phone category and sub categorys */}
// <Route path="/phone" element={<PHONE />} />
// {/* electronic category and sub categorys */}
// <Route path="/electronics" element={<ELECTRONICS />} />

// if (val.category == 'Pre built' || val.category == 'Used Pc') {
//   if (val.aditionalObj.chip !== undefined) {
//     if (val.aditionalObj.chip.includes(filterState?.CPU ?? '')) {
//       return val
//     }
//   }
// }
// if (val.category == 'Pre built' || val.category == 'Used Pc') {
//   if (val.aditionalObj.ramGb !== undefined) {
//     if (val.aditionalObj.ramGb == filterState?.RAM) {
//       return val
//     }
//   }
// }
// if (val.category == 'Pre built' || val.category == 'Used Pc') {
//   if (val.aditionalObj.harddrive !== undefined) {
//     if (val.aditionalObj.harddrive.includes(filterState?.SSD ?? '')) {
//       return val
//     }
//   }
// }
