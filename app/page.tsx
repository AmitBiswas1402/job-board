import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebarClient } from "./_AppSidebarClient";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

const page = () => {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar className="overflow-hidden" collapsible="icon">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl">Job Board</span>
          </SidebarHeader>
          <SidebarContent></SidebarContent>
          <SidebarFooter>
            <SidebarGroup>
              <SignedOut>
                <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/sign-in">
                      <LogInIcon />
                      <span>Log In</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              </SignedOut>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">content</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
};

export default page;
