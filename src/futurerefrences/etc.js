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
