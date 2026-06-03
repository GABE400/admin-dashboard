"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Search,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Building,
  UserPlus,
  Filter,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EmptyState } from "@/components/empty-state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockContacts, Contact } from "@/lib/mock-data";

// Zod Schema for Validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  status: z.enum(["active", "lead", "customer"]),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function CrmPage() {
  // Contacts data state
  const [contacts, setContacts] = React.useState<Contact[]>(mockContacts);

  // Filters and states
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [showCompanyCol, setShowCompanyCol] = React.useState(true);
  const [showContactCol, setShowContactCol] = React.useState(true);
  
  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Active interaction states
  const [activeContact, setActiveContact] = React.useState<Contact | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false); // using sheet for edit too
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [contactToDelete, setContactToDelete] = React.useState<Contact | null>(null);

  // Zod form initialization for adding
  const addForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      status: "lead",
    },
  });

  // Zod form initialization for editing
  const editForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // Prefill edit form when editing
  React.useEffect(() => {
    if (activeContact) {
      editForm.reset({
        name: activeContact.name,
        email: activeContact.email,
        company: activeContact.company,
        phone: activeContact.phone,
        status: activeContact.status,
      });
    }
  }, [activeContact, editForm]);

  // Handle Add Contact Submit
  const onAddSubmit = (values: ContactFormValues) => {
    const newContact: Contact = {
      id: `c-${Date.now()}`,
      ...values,
      lastContact: new Date().toISOString().split("T")[0],
    };
    setContacts([newContact, ...contacts]);
    setIsSheetOpen(false);
    addForm.reset();
  };

  // Handle Edit Contact Submit
  const onEditSubmit = (values: ContactFormValues) => {
    if (!activeContact) return;
    const updated = contacts.map((c) =>
      c.id === activeContact.id ? { ...c, ...values } : c
    );
    setContacts(updated);
    setIsEditDialogOpen(false);
    setActiveContact(null);
  };

  // Handle Delete Confirmation
  const confirmDelete = () => {
    if (!contactToDelete) return;
    setContacts(contacts.filter((c) => c.id !== contactToDelete.id));
    setIsDeleteOpen(false);
    setContactToDelete(null);
  };

  // Filter contacts based on search and status dropdown
  const filteredContacts = React.useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  // Paginated contacts
  const paginatedContacts = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(start, start + itemsPerPage);
  }, [filteredContacts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / itemsPerPage));

  // Reset page when filter shifts
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">CRM Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage relationship cycles, lead funnels, and customer directory profiles.
          </p>
        </div>
        <div>
          <Button onClick={() => setIsSheetOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Contact
          </Button>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer w-full sm:w-40"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="lead">Lead</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>

          {/* Visibility Controls Dropdown / Toggle buttons */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium mr-2">Toggle Columns:</span>
            <Button
              variant={showCompanyCol ? "secondary" : "outline"}
              size="sm"
              onClick={() => setShowCompanyCol(!showCompanyCol)}
              className="text-xs"
            >
              Company
            </Button>
            <Button
              variant={showContactCol ? "secondary" : "outline"}
              size="sm"
              onClick={() => setShowContactCol(!showContactCol)}
              className="text-xs"
            >
              Last Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main CRM Table Card */}
      {/* Main CRM Table Card */}
      {filteredContacts.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/80 text-left text-muted-foreground font-semibold bg-muted/20">
                    <th className="p-4">Contact</th>
                    {showCompanyCol && <th className="p-4">Company</th>}
                    <th className="p-4">Status</th>
                    {showContactCol && <th className="p-4">Last Contact</th>}
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {paginatedContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold uppercase">
                              {contact.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground leading-none">
                              {contact.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground mt-1">
                              {contact.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      {showCompanyCol && (
                        <td className="p-4 text-foreground font-medium">
                          {contact.company}
                        </td>
                      )}
                      <td className="p-4">
                        <Badge
                          variant={
                            contact.status === "customer"
                              ? "success"
                              : contact.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize text-[10px] py-0 px-2"
                        >
                          {contact.status}
                        </Badge>
                      </td>
                      {showContactCol && (
                        <td className="p-4 text-xs text-muted-foreground">
                          {new Date(contact.lastContact).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                      )}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Action */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => {
                              setActiveContact(contact);
                              setIsViewOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {/* Edit Action */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => {
                              setActiveContact(contact);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          {/* Delete Action */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setContactToDelete(contact);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>

          {/* Footer Pagination Controls */}
          <CardFooter className="p-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Showing{" "}
              <strong>
                {filteredContacts.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(currentPage * itemsPerPage, filteredContacts.length)}
              </strong>{" "}
              of <strong>{filteredContacts.length}</strong> contacts
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs font-semibold px-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <EmptyState
          title="No Contacts Found"
          description="Try adjusting your search criteria or lifecycle filters, or create a brand new contact profile."
          actionLabel="Add Contact"
          onActionClick={() => setIsSheetOpen(true)}
        />
      )}

      {/* ================= ADD CONTACT SLIDE-OVER (SHEET) ================= */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" /> Add New Contact
            </SheetTitle>
            <SheetDescription>
              Create a new customer profile. Validations are triggered on submit.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4 py-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                {...addForm.register("name")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {addForm.formState.errors.name && (
                <p className="text-xs text-red-500 font-medium">
                  {addForm.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane.doe@acme.com"
                {...addForm.register("email")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {addForm.formState.errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {addForm.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Company Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Acme Corporation"
                {...addForm.register("company")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {addForm.formState.errors.company && (
                <p className="text-xs text-red-500 font-medium">
                  {addForm.formState.errors.company.message}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 555-5555"
                {...addForm.register("phone")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {addForm.formState.errors.phone && (
                <p className="text-xs text-red-500 font-medium">
                  {addForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Lifecycle Status
              </label>
              <select
                {...addForm.register("status")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="customer">Customer</option>
              </select>
              {addForm.formState.errors.status && (
                <p className="text-xs text-red-500 font-medium">
                  {addForm.formState.errors.status.message}
                </p>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Profile</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* ================= EDIT CONTACT SLIDE-OVER (SHEET) ================= */}
      <Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-primary" /> Edit Contact Profile
            </SheetTitle>
            <SheetDescription>
              Modify contact configurations. Changes apply to table in real-time.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                {...editForm.register("name")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {editForm.formState.errors.name && (
                <p className="text-xs text-red-500 font-medium">
                  {editForm.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                {...editForm.register("email")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {editForm.formState.errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {editForm.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Company Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Company Name
              </label>
              <input
                type="text"
                {...editForm.register("company")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {editForm.formState.errors.company && (
                <p className="text-xs text-red-500 font-medium">
                  {editForm.formState.errors.company.message}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </label>
              <input
                type="text"
                {...editForm.register("phone")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {editForm.formState.errors.phone && (
                <p className="text-xs text-red-500 font-medium">
                  {editForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Lifecycle Status
              </label>
              <select
                {...editForm.register("status")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="customer">Customer</option>
              </select>
              {editForm.formState.errors.status && (
                <p className="text-xs text-red-500 font-medium">
                  {editForm.formState.errors.status.message}
                </p>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* ================= VIEW DETAILS MODAL (DIALOG) ================= */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Profile Details</DialogTitle>
            <DialogDescription>
              Operational information for relationship tracking.
            </DialogDescription>
          </DialogHeader>

          {activeContact && (
            <div className="space-y-4 py-3">
              {/* Profile Card header */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold uppercase">
                    {activeContact.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-foreground">{activeContact.name}</h3>
                  <Badge variant="outline" className="w-fit capitalize mt-1 text-[10px]">
                    {activeContact.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Items */}
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-foreground font-medium">{activeContact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building className="h-4 w-4 text-primary" />
                  <span className="text-foreground font-medium">{activeContact.company}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-foreground font-medium">{activeContact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>
                    Last contact registered:{" "}
                    <strong className="text-foreground font-semibold">
                      {activeContact.lastContact}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= DELETE CONFIRMATION MODAL (DIALOG) ================= */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this profile? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {contactToDelete && (
            <div className="p-3.5 rounded-lg border border-destructive/20 bg-destructive/5 text-sm space-y-1">
              <span className="font-bold text-foreground block">{contactToDelete.name}</span>
              <span className="text-xs text-muted-foreground block">{contactToDelete.company}</span>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
