import Link from "next/link";
import { RegistrationMark } from "@/components/Media";

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <RegistrationMark className="h-12 w-12 text-signal" />
      <h1 className="h-display mt-6 max-w-[16ch]">This page is out of register.</h1>
      <p className="lede mt-5">The page you followed doesn&rsquo;t exist or has moved. Start from the machine range, or get in touch.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/machines" className="btn-primary">See the machines</Link>
        <Link href="/contact" className="btn-secondary">Contact us</Link>
      </div>
    </div>
  );
}
