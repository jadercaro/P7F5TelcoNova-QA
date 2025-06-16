import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AppSidebar, AppSidebarProps } from "@/components/organisms/AppSidebar";
import {
  SidebarInset,
} from "@/components/ui/sidebar";
import { Clipboard, AlarmMinus, AlarmPlus, AlarmCheck } from "lucide-react";
import { IncidentPieChart } from "@/components/molecules/IncidentPieChart";
import { useEffect, useState } from "react";
import { parseCookies } from "@/lib/utils";
import { Incident } from "@/lib/models";
import { IncidentDialog } from "@/components/organisms/IncidentDialog";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<AppSidebarProps>> {
  const cookieHeader = context.req.headers.cookie || "";
  const cookies = parseCookies(cookieHeader);

  const { username, id, email } = cookies;

  if (!username || !id || !email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      username,
      email,
    },
  };
}

export default function DashboardPage({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  const [chartData, setChartData] = useState([
    { status: "ABIERTAS", incidences: 0, fill: "#A7AEAE" },
    { status: "EN PROCESO", incidences: 0, fill: "#D47846" },
    { status: "CERRADAS", incidences: 0, fill: "#6B78D9" },
  ]);

  useEffect(() => {
    fetch("/mockData.json")
      .then((res) => res.json())
      .then((data) => {
        const countByState = {
          opened: 0,
          inProgress: 0,
          closed: 0
        }

        data.incidents.forEach((incident: Incident) => {
          if (countByState[incident.state] !== undefined) countByState[incident.state]++;
        })

        setChartData([
          {
            status: "ABIERTAS",
            incidences: countByState.opened,
            fill: "#A7AEAE",
          },
          {
            status: "EN PROCESO",
            incidences: countByState.inProgress,
            fill: "#D47846",
          },
          {
            status: "CERRADAS",
            incidences: countByState.closed,
            fill: "#6B78D9",
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const totalIncidences: number = chartData.reduce(
    (sum, item) => sum + item.incidences,
    0
  );

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <AppSidebar username={username} email={email} />
      <SidebarInset className="bg-white">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full justify-end">
            <IncidentDialog open={openDialog} onOpenChange={setOpenDialog} initialData={undefined} mode="create"/>
          </div>
        </header>
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-1/2 grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 gap-4 gap-x-12 p-2">
            <div className="bg-white shadow-md border border-black rounded-lg text-black flex p-10">
              <div className="h-full flex-2 flex flex-col items-center justify-around text-center">
                <span className="text-xl">INCIDENCIAS TOTALES</span>
                <span className="text-3xl">{totalIncidences}</span>
              </div>
              <Clipboard className="flex-1 w-full h-full" />
            </div>

            <div className="bg-white shadow-md border border-black rounded-lg text-black flex p-10">
              <div className="h-full flex-2 flex flex-col items-center justify-around text-center">
                <span className="text-xl">INCIDENCIAS ABIERTAS</span>
                <span className="text-3xl">{chartData[0].incidences}</span>
              </div>
              <AlarmPlus className="flex-1 w-full h-full" />
            </div>
            <div className="bg-white shadow-md border border-black rounded-lg text-black flex p-10">
              <div className="h-full flex-2 flex flex-col items-center justify-around text-center">
                <span className="text-xl">INCIDENCIAS EN PROCESO</span>
                <span className="text-3xl">{chartData[1].incidences}</span>
              </div>
              <AlarmMinus className="flex-1 w-full h-full" />
            </div>
            <div className="bg-white shadow-md border border-black rounded-lg text-black flex p-10">
              <div className="h-full flex-2 flex flex-col items-center justify-around text-center">
                <span className="text-xl">INCIDENCIAS CERRADAS</span>
                <span className="text-3xl">{chartData[2].incidences}</span>
              </div>
              <AlarmCheck className="flex-1 w-full h-full" />
            </div>
          </div>

          <div className="h-1/2 bg-white flex flex-col md:flex-row items-center justify-center p-0 border border-black rounded-lg m-2 text-black">
            <div className="w-full md:w-1/2 flex-1 flex flex-col p-5 items-center justify-center text-center text-3xl">
              <span>INCIDENCIAS POR ESTADO</span>
              <br />
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-[#A7AEAE]"></div>
                <span>
                  ABIERTAS -{" "}
                  {((chartData[0].incidences / totalIncidences) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-[#D47846]"></div>
                <span>
                  EN PROCESO -{" "}
                  {((chartData[1].incidences / totalIncidences) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-[#6B78D9]"></div>
                <span>
                  CERRADAS -{" "}
                  {((chartData[2].incidences / totalIncidences) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex-1">
              <IncidentPieChart chartData={chartData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}