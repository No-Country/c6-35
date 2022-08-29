
export default function ScreenCatch({data, status}:{status:any,data:any}) {
    return (
        <div className="h-screen bg-app-msj-warning text-app-w-write flex flex-col justify-center items-center">
          <p className="font-extrabold text-9xl">{status}</p>
          <pre>
            <code className="text-2xl text-app-msj-warning-pale">{data}</code>
          </pre>
        </div>
      );
}