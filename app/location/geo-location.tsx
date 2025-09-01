import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

interface GeoLocation {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export default function GeoLocationPage() {
  const [data, setData] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://ip-api.com/json")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setData(json);
        } else {
          setError(json.message || "Failed to fetch geo-location.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Geo-Location</h2>
        {loading && (
          <div>
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3 mb-2" />
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {data && (
          <div className="space-y-2">
            <div><span className="font-semibold">IP:</span> {data.query}</div>
            <div><span className="font-semibold">Country:</span> {data.country} ({data.countryCode})</div>
            <div><span className="font-semibold">Region:</span> {data.regionName} ({data.region})</div>
            <div><span className="font-semibold">City:</span> {data.city}</div>
            <div><span className="font-semibold">ZIP:</span> {data.zip}</div>
            <div><span className="font-semibold">Latitude:</span> {data.lat}</div>
            <div><span className="font-semibold">Longitude:</span> {data.lon}</div>
            <div><span className="font-semibold">Timezone:</span> {data.timezone}</div>
            <div><span className="font-semibold">ISP:</span> {data.isp}</div>
            <div><span className="font-semibold">Org:</span> {data.org}</div>
          </div>
        )}
      </Card>
    </div>
  );
}
