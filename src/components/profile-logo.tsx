import { getLogo } from '@/appwrite/appwrite-functions';
import { useEffect, useState } from 'react';

export default function ProfileLogo(props: any) {
    const [logoUrl, setLogoUrl] = useState<any>();

    useEffect(() => {
        let tempLogoUrl = getLogo(props.menu.logo_id);
        if(!tempLogoUrl.toString().includes('storage_file_not_found')){
            setLogoUrl(tempLogoUrl);
        }
    }, []);
    
    return (
        <>
            { logoUrl && props.menu.logo_id ? 
                    
                    <img 
                        src={logoUrl}
                        alt={props.menu.menu_name} 
                        className="inline-block h-10 w-10"/>
                :
                <div className="avatar">
                    <div className="bg-neutral text-neutral-content h-10 w-10 text-center">
                        <span className="text-3xl">{props.menu.menu_name.substring(0, 1)}</span>
                    </div>
                </div>
            }
        </>
    )
}
