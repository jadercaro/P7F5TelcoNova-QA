import { AppSidebar, AppSidebarProps } from "@/components/organisms/AppSidebar";
import { IncidentDialog } from "@/components/organisms/IncidentDialog";
import { IncidentTable } from "@/components/organisms/IncidentTable";
import { SidebarInset } from "@/components/ui/sidebar";
import { Incident } from "@/lib/models";
import { parseCookies } from "@/lib/utils";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect, useState } from "react";

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

export default function HistoryPage({ username, email }: { username: string; email: string }) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [incidentToEdit, setIncidentToEdit] = useState<Incident | undefined>(undefined);

  useEffect(() => {
    fetch("/mockData.json")
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data.incidents);
      });
  }, []);

  const handleRowClick = (incident: Incident) => {
    setIncidentToEdit(incident);
    setOpenDialog(true);
  };

  return (
    <>
      <AppSidebar username={username} email={email} />
      <SidebarInset className="bg-white p-10">
        <div className="border rounded-[20px]">
          <IncidentTable incidents={incidents} onRowClick={handleRowClick} />
        </div>
      </SidebarInset>
      <IncidentDialog
        mode="edit"
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={incidentToEdit}
      />
    </>
  );
}