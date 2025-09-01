
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

export function meta() {
  return [
    { title: "Geo-Location" },
    { name: "description", content: "Your geo-location details." },
  ];
}

export default function Home() {
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Card className="max-w-lg w-full p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold">Location</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Your Geo-Location</h2>
        </div>
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-7 w-1/3" />
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle className="text-lg font-bold">Error</AlertTitle>
            <AlertDescription className="text-base">{error}</AlertDescription>
          </Alert>
        )}
        {data && (
          <div className="divide-y divide-gray-200">
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">IP Address</span>
              <span className="font-medium text-gray-900">{data.query}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">Country</span>
              <span className="font-medium text-gray-900">{data.country} <span className="text-xs text-gray-400">({data.countryCode})</span></span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">Region</span>
              <span className="font-medium text-gray-900">{data.regionName} <span className="text-xs text-gray-400">({data.region})</span></span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">City</span>
              <span className="font-medium text-gray-900">{data.city}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">ZIP</span>
              <span className="font-medium text-gray-900">{data.zip}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">Latitude</span>
              <span className="font-medium text-gray-900">{data.lat}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">Longitude</span>
              <span className="font-medium text-gray-900">{data.lon}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">Timezone</span>
              <span className="font-medium text-gray-900">{data.timezone}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">ISP</span>
              <span className="font-medium text-gray-900">{data.isp}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-500">Organization</span>
              <span className="font-medium text-gray-900">{data.org}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
