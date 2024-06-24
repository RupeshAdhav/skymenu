
export default function ThreeColumnRow2(props: any) {
    return (
        <>
            <tr className="border-b-0">
                <td className="w-[70%] pb-0 text-left pl-3 pt-3">
                    <span>{props.item.item_name}</span>
                </td>
                <td className="w-[15%] pb-0 text-right pr-3 pt-3">
                    <span>{props.menu.country_id.currency_symbol}</span>
                    <span>{props.item.price1}</span>
                </td>
                <td className="w-[15%] pb-0 text-right pr-3 pt-3">
                    <span>{props.menu.country_id.currency_symbol}</span>
                    <span>{props.item.price2}</span>
                </td>
            </tr>
            <tr className={`${props.isLast ? '' : 'border-b-[1px]'}`}>
                <td className="text-xs text-left pl-3 pb-3" colSpan={2}>
                    <span>{props.item.description}</span>
                </td>
            </tr>
        </>
    )
}