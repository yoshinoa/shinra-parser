import { useRouter } from "next/router";

export default function JsonLog() {
  const router = useRouter();
  const { jsonHash } = router.query;

  return <h1>Log {jsonHash}</h1>;
}
