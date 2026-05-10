import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Badge() {
    return (
        <div className="flex justify-center gap-36 items-center">
            <Marquee direction="left" speed={150} pauseOnHover={true}>
                <Image className="mx-16" src="/badge1.svg" alt="Badge 1" width={140} height={140} />
                <Image className="mx-16" src="/badge2.svg" alt="Badge 2" width={140} height={140} />
                <Image className="mx-16" src="/badge3.svg" alt="Badge 3" width={140} height={140} />
                <Image className="mx-16" src="/badge4.svg" alt="Badge 4" width={140} height={140} />
                <Image className="mx-16" src="/badge5.svg" alt="Badge 5" width={140} height={140} />
                <Image className="mx-16" src="/badge1.svg" alt="Badge 1" width={140} height={140} />
                <Image className="mx-16" src="/badge2.svg" alt="Badge 2" width={140} height={140} />
                <Image className="mx-16" src="/badge3.svg" alt="Badge 3" width={140} height={140} />
                <Image className="mx-16" src="/badge4.svg" alt="Badge 4" width={140} height={140} />
                <Image className="mx-16" src="/badge5.svg" alt="Badge 5" width={140} height={140} />
                <Image className="mx-16" src="/badge1.svg" alt="Badge 1" width={140} height={140} />
                <Image className="mx-16" src="/badge2.svg" alt="Badge 2" width={140} height={140} />
                <Image className="mx-16" src="/badge3.svg" alt="Badge 3" width={140} height={140} />
                <Image className="mx-16" src="/badge4.svg" alt="Badge 4" width={140} height={140} />
                <Image className="mx-16" src="/badge5.svg" alt="Badge 5" width={140} height={140} />
                <Image className="mx-16" src="/badge1.svg" alt="Badge 1" width={140} height={140} />
                <Image className="mx-16" src="/badge2.svg" alt="Badge 2" width={140} height={140} />
                <Image className="mx-16" src="/badge3.svg" alt="Badge 3" width={140} height={140} />
                <Image className="mx-16" src="/badge4.svg" alt="Badge 4" width={140} height={140} />
                <Image className="mx-16" src="/badge5.svg" alt="Badge 5" width={140} height={140} />
            </Marquee>
        </div>
    );
}