
export default function TwoColumnRow(props: any) {
    return (
        <>
            <tr className="border-b-0">
                <td className="w-[85%] pb-0 text-left pl-3 pt-3">
                    <span>{props.item.item_name}</span>
                </td>
                <td className="w-[15%] pb-0 text-right pr-5 pt-3">
                    <span>{props.menu.country_id.currency_symbol}</span>
                    <span>{props.item.price1}</span>
                </td>
            </tr>
            <tr className={`${props.isLast ? '' : 'border-b-[1px]'}`}>
                <td className="text-xs text-left pl-3 pb-3">
                    <span>{props.item.description}</span>
                </td>
                <td>

                </td>
            </tr>
        </>
    )
}